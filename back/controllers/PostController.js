import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful Get All Post" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (e) {
          console.log(e);
          return res.status(500).json({ msg: "Cant Get this Pos t" });
        }
        if (!doc) {
          return res.status(404).json({ msg: "Post not consist" });
        }
        res.json(doc);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful Get All Post" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.title,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful creating Post" });
  }
};
