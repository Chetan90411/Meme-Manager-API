import { Schema, model } from "mongoose";

const memeSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    imgLink: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tag: [String],
  },
  {
    timestamps: true,
  }
);

const Meme = model("Meme", memeSchema);

export default Meme;
