

const mongoose = require('mongoose');
const uri = "mongodb+srv://jitendrakhilar609:eqgwNacyryi2juGX@cluster0.gxn8xql.mongodb.net/mtbusers?retryWrites=true&w=majority";


const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
