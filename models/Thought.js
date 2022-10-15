const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
)

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;