const productModel = require("../models/product.model");
const brandModel = require("../models/brand.model");
const productCategoryModel = require("../models/product-category.model");

const createFilter = async ({ q, brand, classifyBy }) => {
  const filter = {};

  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }

  if (brand) {
    const brandNames = brand.split(",").map((ad) => ad.trim());
    const brandDocs = await brandModel.find({ name: { $in: brandNames } });
    filter.brand = { $in: brandDocs.map((doc) => doc._id) };
  }

  if (classifyBy) {
    const categoryNames = classifyBy
      .split(",")
      .map((category) => category.trim());
    const categoryDocs = await productCategoryModel.find({
      name: { $in: categoryNames },
    });
    filter.category = { $in: categoryDocs.map((doc) => doc._id) };
  }

  return filter;
};

const getSliceRange = ({ page, limit }, max) => {
  const bottom = (page - 1) * limit;
  const top = page * limit < max ? page * limit : max;
  return { bottom, top };
};

const mapProductItem = (item) => {
  const obj = item.toObject();
  obj.brand = obj.brand?.name || null;
  obj.category = obj.category?.name || null;
  return obj;
};

const getProductList = async (req, res) => {
  try {
    const filter = await createFilter(req.query);
    let query = productModel
      .find(filter)
      .populate("brand", "name")
      .populate("category", "name");
    if (req.query.price != null) {
      query = query.sort({ price: req.query.price });
    }
    const products = await query;

    const { bottom, top } = getSliceRange(req.query, products.length);

    const mappedList = products.map((item) => mapProductItem(item));

    let newList = [];
    if (bottom || top) {
      newList = mappedList.slice(bottom, top);
      res.status(200).send({ data: newList, total: mappedList.length });
    } else {
      if (!mappedList) {
        res.status(404).json("No direction found!");
      }
      res.status(200).send({ data: mappedList, total: mappedList.length });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found!");
    }
    res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductList, getProduct };
