const tipModel = require("../models/tip.model");

const getSliceRange = ({ page, limit }, max) => {
  const bottom = (page - 1) * limit;
  const top = page * limit < max ? page * limit : max;
  return { bottom, top };
};

const getTipList = async (req, res) => {
  try {
    const tips = await tipModel.find({});
    const { bottom, top } = getSliceRange(req.query, tips.length);
    let newList = [];
    if (bottom || top) {
      newList = tips.slice(bottom, top);
      res.status(200).send({ data: newList, total: tips.length });
    } else {
      if (!tips) {
        res.status(404).json("No tip found!");
      }
      res.status(200).send({ data: tips, total: tips.length });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTip = async (req, res) => {
  try {
    const { id } = req.params;
    const tip = await tipModel.findById(id);
    if (!tip) {
      res.status(404).json("No tip found!");
    }
    res.status(200).send(tip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendTip = async (req, res) => {
  try {
    const { number } = req.query;
    const tips = await tipModel.find({});
    if (!tips) {
      res.status(400).json("No tip found!");
    }
    const recommendTip = tips.slice(0, number);
    res.status(200).send({ data: recommendTip, total: recommendTip.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTipList, getTip, getRecommendTip };
