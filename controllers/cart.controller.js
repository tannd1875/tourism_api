const cartModel = require("../models/cart.model");

const addProductToCart = async (req, res) => {
  try {
    // Check if userCart does not exist => create a new cart, push the product into it
    // If userCart exists, check if the product already exists in the cart => plus the quantity
    // If the product does not exist in the cart, push the product into the cart
    const { userId } = req.user;
    const { productId, quantity } = req.body;
    const userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      const newCart = await cartModel.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      return res.status(201).json(newCart);
    } else if (userCart) {
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity += quantity;
      } else {
        userCart.items.push({ product: productId, quantity });
      }
      const updatedCart = await userCart.save();
      return res.status(200).json(updatedCart);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// update quantity
const updateItemInCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items } = req.body;
    const userCart = await cartModel.findOne({ user: userId });
    // If userCart exists, update items in the cart
    items.forEach((product) => {
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.product.toString() === product.id
      );
      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity = product.quantity;
      } else {
        userCart.items.push({
          product: product.productId,
          quantity: product.quantity,
        });
      }
    });

    const updatedCart = await userCart.save();
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const userCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product", "name price images");
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    return res.status(200).json(userCart);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getCartList = async (req, res) => {
  try {
    const carts = await cartModel
      .find()
      .populate("user", "name email")
      .populate("items.product", "name price");
    if (!carts) {
      return res.status(404).json({ message: "No carts found!" });
    }
    return res.status(200).json(carts);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const deleteItemFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.body;
    const userCart = await cartModel.findOne({ user: userId });
    userCart.items = userCart.items.filter(
      (item) => item.product.toString() !== productId
    );
    const updatedCart = await userCart.save();
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  addProductToCart,
  getUserCart,
  updateItemInCart,
  deleteItemFromCart,
  getCartList,
};
