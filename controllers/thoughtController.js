const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('reactions')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body).then((dbThoughtData) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        {$push: {thoughts: dbThoughtData._id}},
        { new: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "Thought created but no user with that id found!" });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.status(500).json(err));
    });
  },
  updateThought(req,res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true})
    .then((dbThoughtData) => {
      if(!dbThoughtData){
        return res.status(404).json({message: 'No thought with that id!'})
      }
      res.json(dbThoughtData)}
      )
    .catch((err) => res.status(500).json(err));
  },
  deleteThought(req,res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((dbThoughtData) => {
      if(!dbThoughtData){
        return res.status(404).json({message: 'No thought with that id!'})
      }
      res.json({message: 'Thought has been deleted!'})}
      )
    .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body} }, {new: true})
    .then((dbThoughtData) => {
      if(!dbThoughtData){
        return res.status(404).json({message: 'No thought with that id!'})
      }
      res.json(dbThoughtData)}
      )
    .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req,res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions : {reactionId : req.params.reactionId} } }, {new: true})
    .then((dbThoughtData) => {
      if(!dbThoughtData){
        return res.status(404).json({message: 'No thought with that id!'})
      }ç
      res.json(dbThoughtData)}
      )
    .catch((err) => res.status(500).json(err));
  },
};
