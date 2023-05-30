import mongoose from "mongoose";

const dbConnect = async () => {
  try {
     mongoose.connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
export default dbConnect;