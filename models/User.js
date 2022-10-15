const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: String,
        email: String,
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friend: [
            {
                type: Schema.Types.ObjectId,
                ref: 'friend'
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

// userSchema
//   .virtual('friendCount')
//   .get(function () {
//     return `${this.friends.length}`;
//   })
//   .set(function (v) {
//     const first = v.split(' ')[0];
//     const last = v.split(' ')[1];
//     this.set({ first, last });
//   });


module.exports = User;