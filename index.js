const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");

const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8zviwwt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const database = client.db("review-log");
    // const productsCollection = database.collection("products");
async function run() {
  try {
    const productsCollection = client
      .db("review-log")
      .collection("products");
    app.get('/products',async(req,res)=>{
      const query={};
      const cursor = productsCollection.find(query);
      const products= await cursor.toArray();
      res.send(products);
    });
    //get data important
    app.get('/products/:id',async (req,res)=>{
      const id=req.params.id;
      const objectId = new ObjectId(id);
      const product = await productsCollection.findOne({ _id: objectId });
      res.send(product)
    })
    app.get("/", (req, res) => {
      res.send("Welcome Review-log Server");
    });
    
    app.listen(port, () => {
      console.log(`port in ${port}`);
    });
    
  } finally {
    // Ensures that the client will close when you finish/error

    
  }
}
run().catch(console.dir);
