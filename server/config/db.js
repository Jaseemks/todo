const mongoose = require('mongoose');

console.log(process.env.MONGODB_URL);


const connectDB = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected");
        
        
    } catch (error) {
        console.log(error);
        // res.statu(500).json(error);
        
    }
}

module.exports = {connectDB};