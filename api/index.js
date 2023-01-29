const express = require('express');
let cors =require("cors")
const app = express();
const port = 8000 ;
const mongoose = require('mongoose');
const routes = require("../routes")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use("/api",routes)

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://scopionjs:scopionjs@cluster0-shard-00-00.klfvs.mongodb.net:27017,cluster0-shard-00-01.klfvs.mongodb.net:27017,cluster0-shard-00-02.klfvs.mongodb.net:27017/dmubamusic?ssl=true&replicaSet=atlas-k6x59u-shard-0&authSource=admin&retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error',(e)=>{
  console.log(e.message)
});
db.once('open', function() {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
