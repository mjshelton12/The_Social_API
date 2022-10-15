const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
)

module.exports = reactionSchema;