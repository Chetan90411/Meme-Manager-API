import pkg from "mongoose";
const { connect } = pkg;

function connectDB() {
  connect(process.env.mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Database connected"));
}

export { connectDB };
