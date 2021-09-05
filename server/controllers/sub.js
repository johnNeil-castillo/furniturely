const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();

    res.json(sub);
  } catch (err) {
    console.log("Sub create errr ===>", err);
    res.status(400).send("Create Sub failed");
  }
};

exports.list = async (req, res) => {
  const sub = await Sub.find({}).sort({ createdAt: -1 }).exec();

  res.json(sub);
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();

  res.json({ sub, products });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (errr) {
    res.status(400).send("Update Sub failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });

    res.json(deleted);
  } catch (err) {
    res.status(400).send("Delete Sub failed");
  }
};
