import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import db from './dbModel.js';
import dotEnv from 'dotenv';
dotEnv.config();

const app = express();
const PORT = 9000 || process.env.PORT;
const MONDGO_DB_URI = process.env.MONGO_DB_URI;

// app config
app.use(cors())
app.use(express.json());

// db config
 mongoose.connect(MONDGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

// routes
app.get('/', (req, res) => {
    res.status(200).send("API IS LIVE")
})

app.post('/courses', (req, res) => {
   
    const newCourse = req.body;
    db.create(newCourse, (err, data) =>{
         if(err){
           res.status(500).send(err);
         }else{
            res.status(201).send(data);
         }
    } )

})

app.get('/courses', (req, res) => {
   
    db.find((err, data) =>{
         if(err){
           res.status(500).send(err);
         }else{
            res.status(200).send(data);
         }
    })

})

app.get('/courses/:id', (req, res) => {
     db.findOne({ _id: req.params.id}, (err, data) => { 
          if(err){
             res.status(500).send(err);
          }else{
             res.status(200).send(data);
          }
     })
})



// listen
app.listen(PORT, () => console.log('Server is started on PORT:', PORT) );






