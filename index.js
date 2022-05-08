const { request } = require('express');
const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.CAR_USER}:${process.env.CAR_PASS}@cluster0.tmpsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

      try{

        await client.connect();
        const carCollection = client.db('showroom').collection('cars');
        app.get('/cars', async(req,res)=>{
          const query ={};
          const  cursor = carCollection.find(query);
          const car = await cursor.toArray();
          res.send(car);
        });


        // single id 
        app.get('/cars/:id', async(req,res)=>{
          const id = req.params.id;
          const query ={_id: ObjectId(id)};
          const result = await carCollection.findOne(query);
          res.send(result);
        });


      
        // post / add iteams

        app.post('/cars',async(req,res)=>{
          const newService = req.body;
          const result = await carCollection.insertOne(newService);
          res.send(result);
        });

       



        // delete api 
        app.delete('/cars/:id', async(req, res)=>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const result = await carCollection.deleteOne(query);
          res.send(result);
        });


       




      }
      finally{

      }

}

run().catch(console.dir);


app.get('/hero',(req,res)=>{
    res.send('vai asi');
});

app.get('/',(req,res)=>{
    res.send('running cars');
});

app.listen(port,()=>{
    console.log("listning to port", port);
})  