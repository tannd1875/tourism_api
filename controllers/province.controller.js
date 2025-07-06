const provinceModel = require("../models/province.model");

const getProvinceList = async (req, res) => {
  try {
    const provinceList = await provinceModel.find({});
    if (!provinceList) {
      return res.status(404).send("No province found!");
    }
    return res
      .status(200)
      .send({ data: provinceList, total: provinceList.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProvinceList };
