const branModel = require("../models/brand.model");

const getBrandList = async (req, res) => {
  try {
    const brandList = await branModel.find();
    if (!brandList) {
      return res.status(404).json("No brand found!");
    }
    return res.status(200).send({ data: brandList, total: brandList.length });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

module.exports = { getBrandList };
