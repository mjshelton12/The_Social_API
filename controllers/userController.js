const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req,res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true})
    .then((dbUserData) => {
      if(!dbUserData){
        return res.status(404).json({message: 'no user with that id!'})
      }
      res.json(dbUserData)}
      )
    .catch((err) => res.status(500).json(err));
  },
  deleteUser(req,res) {
    User.findOneAndDelete({_id: req.params.userId})
    .then((dbUserData) => {
      if(!dbUserData){
        return res.status(404).json({message: 'no user with that id!'})
      }
      res.json({message: 'user has been deleted!'})}
      )
    .catch((err) => res.status(500).json(err));
  },
  addFriend(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      {$push: {friends: req.params.friendId}}, 
      {new: true})
    .then((dbUserData) => {
      if(!dbUserData){
        return res.status(404).json({message: 'no user with that id!'})
      }
      res.json(dbUserData)}
      )
    .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      {$pull: {friends: req.params.friendId}}, 
      {new: true})
    .then((dbUserData) => {
      if(!dbUserData){
        return res.status(404).json({message: 'no user with that id!'})
      }
      res.json(dbUserData)}
      )
    .catch((err) => res.status(500).json(err));
  }
};
