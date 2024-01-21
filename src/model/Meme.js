import pkg from "mongoose";
const { Schema, model } = pkg;

const memeSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    url: {
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

// Create text indexes
memeSchema.index({ description: "text", tag: "text" });

const Meme = model("Meme", memeSchema);

export default Meme;
