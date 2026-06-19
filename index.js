const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

const client = new MongoClient(MONGODB_URI, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});


async function run() {
      try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            const db = client.db("docappoint");
            const doctorCollection = db.collection("doctors");


            app.get("/all-appointments", async (req, res) => {
                  const result = await doctorCollection.find().toArray();
                  res.json(result);
            });

            app.get("/all-appointments/:doctorid", async (req, res) => {
                  // const id = req.params.doctorid;
                  const { doctorid } = req.params;
                  const query = { _id: new ObjectId(doctorid) };
                  const result = await doctorCollection.findOne(query);
                  res.json(result);
            });

            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
      }
}
run().catch(console.dir);



app.get('/', (req, res) => {
      res.send('Hello W docappoint!')
})

app.listen(PORT, () => {
      console.log(`Example app listening on PORT ${PORT}`)
})

