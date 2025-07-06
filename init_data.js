require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { classification, province, category, brand } = require("./data");
const Product = require("./models/product.model");
const DirectionCategory = require("./models/direction-category.model");
const Province = require("./models/province.model");
const Direction = require("./models/direction.model");
const directionData = require("./data/direction.seed");
const products = require("./data/product.seed");
const ProductCategory = require("./models/product-category.model");
const Brand = require("./models/brand.model");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to DB");
    app.listen(5001, () => {
      console.log("Server on 5001!");
    });
  })
  .catch(() => {
    console.log("fail");
  });

// const seedClassificationData = async () => {
//   try {
//     await DirectionCategory.deleteMany();
//     await DirectionCategory.insertMany(
//       classification.map((name) => ({ name }))
//     );
//     console.log("Classification data seeded successfully");
//   } catch (error) {
//     console.error("Error seeding classification data:", error.message);
//   }
// };

// seedClassificationData();

// const seedProvinceData = async () => {
//   try {
//     await Province.deleteMany();
//     await Province.insertMany(province.map((name) => ({ name })));
//     console.log("Province data seeded successfully");
//   } catch (error) {
//     console.error("Error seeding province data:", error.message);
//   }
// };

// seedProvinceData();

// const seedDirectionData = async () => {
//   try {
//     await Direction.deleteMany();
//     const data = await Direction.insertMany(directionData);
//     if (data) {
//       console.log("Direction data seeded successfully");
//     }
//   } catch (error) {
//     console.error("Error seeding direction data:", error.message);
//   }
// };

// seedDirectionData();

// const seedCategoryData = async () => {
//   try {
//     await ProductCategory.deleteMany();
//     const categories = await ProductCategory.insertMany(
//       category.map((name) => ({ name }))
//     );
//     if (categories) {
//       console.log("Product category data seeded successfully");
//     }
//   } catch (error) {
//     console.error("Error seeding direction category data:", error.message);
//   }
// };

// seedCategoryData();

// const seedBrandData = async () => {
//   try {
//     await Brand.deleteMany();
//     const brandsData = await Brand.insertMany(
//       brand.map((item) => ({
//         name: item.name,
//         country: item.country,
//       }))
//     );
//     if (brandsData) {
//       console.log("Product data seeded successfully");
//     }
//   } catch (error) {
//     console.error("Error seeding product data:", error.message);
//   }
// };

// seedBrandData();

const seedProductData = async () => {
  try {
    await Product.deleteMany();
    const productsData = await Product.insertMany(products);
    if (productsData) {
      console.log("Product data seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding product data:", error.message);
  }
};

seedProductData();
