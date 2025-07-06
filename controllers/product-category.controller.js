const productCategoryModel = require("../models/product-category.model");

const getProductCategoryList = async (req, res) => {
  try {
    const productCategoryList = await productCategoryModel.find({});
    return res
      .status(200)
      .send({ data: productCategoryList, total: productCategoryList.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getProductCategoryList };
