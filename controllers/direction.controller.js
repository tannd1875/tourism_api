const directionModel = require("../models/direction.model");
const provinceModel = require("../models/province.model");
const directionCategoryModel = require("../models/direction-category.model");

const createFilter = async ({ q, province, classifyBy }) => {
  const filter = {};

  if (q) {
    filter.title = { $regex: q, $options: "i" };
  }

  if (province) {
    const provinceDocs = await provinceModel.find({
      name: { $in: province.split(",").map((s) => s.trim()) },
    });
    filter.province = { $in: provinceDocs.map((doc) => doc._id) };
  }

  if (classifyBy) {
    const classifyDocs = await directionCategoryModel.find({
      name: { $in: classifyBy.split(",").map((s) => s.trim()) },
    });
    filter.classify = { $in: classifyDocs.map((doc) => doc._id) };
  }
  return filter;
};

const getSliceRange = ({ page, limit }, max) => {
  const bottom = (page - 1) * limit;
  const top = page * limit < max ? page * limit : max;
  return { bottom, top };
};

const mapDirectionItem = (item) => {
  const obj = item.toObject();
  obj.province = obj.province?.name || null;
  obj.classify = obj.classify?.name || null;
  return obj;
};

const getDirectionList = async (req, res) => {
  try {
    const filter = await createFilter(req.query);
    const directionList = await directionModel
      .find(filter)
      .populate("province", "name")
      .populate("classify", "name");

    const { bottom, top } = getSliceRange(req.query, directionList.length);

    const mappedList = directionList.map((item) => mapDirectionItem(item));

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
    res.status(500).json({ message: error.message });
  }
};

const getDirection = async (req, res) => {
  try {
    const { id } = req.params;
    const direction = await directionModel
      .findById(id)
      .populate("province", "name")
      .populate("classify", "name");
    if (!direction) {
      res.status(404).json("No direction found!");
    }
    const mapItem = mapDirectionItem(direction);
    res.status(200).send(mapItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendDirection = async (req, res) => {
  const { number } = req.query;
  try {
    const directionList = await directionModel
      .find({})
      .populate("province", "name")
      .populate("classify", "name");
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    const recommendList = directionList.slice(0, number);
    const mappedList = recommendList.map((item) => mapDirectionItem(item));
    res.status(200).send({ data: mappedList, total: mappedList.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDirection = async (req, res) => {
  try {
    const {
      title,
      province,
      detailAddress,
      classify,
      price,
      images,
      description,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !province ||
      !detailAddress ||
      !classify ||
      !price ||
      !images ||
      !description
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDirection = await directionModel.create({
      title,
      province,
      detailAddress,
      classify,
      price,
      images,
      description,
    });
    res.status(201).json(newDirection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDirection,
  getDirectionList,
  getRecommendDirection,
  getSliceRange,
  createDirection,
};
