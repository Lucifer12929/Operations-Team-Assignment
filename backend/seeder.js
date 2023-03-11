const dotenv = require("dotenv");
const mongoose = require('mongoose')
const Users = require('./models/userModel')

dotenv.config();
// const CONNECTION_URL='mongodb+srv://prateek_shaw:BTmVv2SXVzkyeUdF@cluster0.cghfeiy.mongodb.net/?retryWrites=true&w=majority'
const CONNECTION_URL =
  "mongodb+srv://prateek:4qr3yNg0QzWha9CA@cluster0.rrzdv6q.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(CONNECTION_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error**: ${error.message}`)
            process.exit(1)
    }
}

const importdata = async () => {
    connectDB()
}




if (process.argv[2] === '-i') {
    importdata()


} else {
    console.log('nothing to run')
}