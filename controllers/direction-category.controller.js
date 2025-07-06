const directionCategoryModel = require("../models/direction-category.model");

const getClassificationList = async (req, res) => {
  try {
    const classificationList = await directionCategoryModel.find({});
    if (!classificationList) {
      return res.status(404).send("No province found!");
    }
    return res
      .status(200)
      .send({ data: classificationList, total: classificationList.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getClassificationList };
