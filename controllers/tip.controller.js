const tipModel = require("../models/tip.model");

const getTipList = async (req, res) => {
  try {
    const tips = await tipModel.find({});
    if (!tips) {
      res.status(404).json("No tip found!");
    }
    res.status(200).send(tips);
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

module.exports = { getTipList, getTip };
