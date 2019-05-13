const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "users"
  },
  imageUrl: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  name: {
    type: String
  },

  likes: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Image = mongoose.model("image", ImageSchema);
