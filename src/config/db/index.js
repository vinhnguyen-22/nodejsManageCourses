const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/vinhnodejs_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connect");
  } catch (error) {
    console.log("disconnect");
  }
}
module.exports = { connect };
