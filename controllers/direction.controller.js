const directionModel = require("../models/direction.model");

const getDirectionList = async (req, res) => {
  try {
    const directionList = await directionModel.find({});
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    res.status(200).send(directionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirection = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const direction = await directionModel.findById(id);
    if (!direction) {
      res.status(404).json("No direction found!");
    }
    res.status(200).send(direction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirectionByAddress = async (req, res) => {
  try {
    const { address } = req.query;
    console.log(req.params, req.query);
    const directionList = await directionModel.find({
      address: { $regex: address },
    });
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    res.status(200).send(directionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirectionByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    console.log(req.params, req.query);
    const directionList = await directionModel.find({
      title: { $regex: title },
    });
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    res.status(200).send(directionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirectionByAddressAndTitle = async (req, res) => {
  try {
    const { title, address } = req.query;
    console.log(req.params, req.query);
    const directionList = await directionModel.find({
      title: { $regex: title },
      address: { $regex: address },
    });
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    res.status(200).send(directionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirectionListByPage = async (req, res) => {
  try {
    const { page } = req.params;
    console.log(page, req.params, req.query);
    const directionList = await directionModel.find({});
    let startPosition = page * 6;
    let endPosition = page * 6 + 5;
    if (endPosition > directionList.length) {
      endPosition = directionList.length;
    }
    console.log(startPosition, endPosition);
    const directionListByPage = directionList.slice(startPosition, endPosition);
    res.status(200).send(directionListByPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDirectionListByClassification = async (req, res) => {
  try {
    const { classify } = req.query;
    console.log(req.params, req.query);
    const directionList = await directionModel.find({
      classify: { $regex: classify },
    });
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    res.status(200).send(directionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProvinceList = async (req, res) => {
  try {
    const directionList = await directionModel.find({});
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    const provinceList = Object.values(directionList).map((dt) => {
      return dt.address;
    });
    const setProvince = new Set(provinceList);
    res.status(200).send([...setProvince]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassifyList = async (req, res) => {
  try {
    const directionList = await directionModel.find({});
    if (!directionList) {
      res.status(404).json("No direction found!");
    }
    const classifyList = Object.values(directionList).map((dt) => {
      return dt.classify;
    });
    const setClassify = new Set(classifyList);
    res.status(200).send([...setClassify]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getDirection,
  getDirectionList,
  getDirectionByAddress,
  getDirectionByAddressAndTitle,
  getDirectionByTitle,
  getDirectionListByPage,
  getDirectionListByClassification,
  getProvinceList,
  getClassifyList,
};
