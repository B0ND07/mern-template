import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mohamedhashimkp:${process.env.DB_PASS}@cluster0.asbt6qc.mongodb.net/template?retryWrites=true&w=majority`
    );
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
