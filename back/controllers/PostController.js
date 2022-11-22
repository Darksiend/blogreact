import PostSchema from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostSchema({
      title: req.body.title,
      text: req.body.title,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful creating Post" });
  }
};
