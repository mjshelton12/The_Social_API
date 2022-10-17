const { Thought, User } = require("../models");

module.exports = {
  createThought(req, res) {
    Thought.create(req.body).then((dbThoughtData) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        {$push: {thoughts: dbThoughtData._id}},
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "no user with that id!" });
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(500).json(err));
    });
  },
};
