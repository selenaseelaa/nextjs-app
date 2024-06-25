import mongoose from "mongoose";

let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
    return;
  }

  console.log('MONGO_PASSWORD:', process.env.MONGO_PASSWORD);

  const password = process.env.MONGO_PASSWORD ? encodeURIComponent(process.env.MONGO_PASSWORD.trim()) : null;

  //tambah
  if (!password) {
    console.error("MONGO_PASSWORD environment variable is not set");
    throw new Error("MONGO_PASSWORD environment variable is not set");
  }

  const connectionString = `mongodb+srv://naseelazahra:${password}@devcluster.2w5vig2.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`;

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;