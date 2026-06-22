const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());
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
            const appointmentCollection = db.collection("appointments");

            app.post("/appointments", async (req, res) => {
                  try {
                        const appointment = req.body;

                        const result = await appointmentCollection.insertOne(appointment);

                        res.json({
                              success: true,
                              insertedId: result.insertedId,
                        });
                  } catch (error) {
                        res.status(500).json({
                              success: false,
                              error: error.message,
                        });
                  }
            });

            // AFTER — filters by email if provided
            app.get("/appointments", async (req, res) => {
                  try {
                        const { email } = req.query;
                        const query = email ? { email: email } : {};
                        const result = await appointmentCollection.find(query).toArray();
                        res.json(result);
                  } catch (error) {
                        res.status(500).json({ success: false, error: error.message });
                  }
            });
            // UPDATE appointment
            app.put("/appointments/:id", async (req, res) => {
                  try {
                        const { id } = req.params;
                        const updates = req.body;
                        const result = await appointmentCollection.updateOne(
                              { _id: new ObjectId(id) },
                              { $set: updates }
                        );
                        res.json({ success: true, modifiedCount: result.modifiedCount });
                  } catch (error) {
                        res.status(500).json({ success: false, error: error.message });
                  }
            });

            // DELETE appointment
            app.delete("/appointments/:id", async (req, res) => {
                  try {
                        const { id } = req.params;
                        const result = await appointmentCollection.deleteOne({ _id: new ObjectId(id) });
                        res.json({ success: true, deletedCount: result.deletedCount });
                  } catch (error) {
                        res.status(500).json({ success: false, error: error.message });
                  }
            });


            app.get("/all-appointments", async (req, res) => {
                  const result = await doctorCollection.find().toArray();
                  res.json(result);
            });

            app.get("/all-appointments/:id", async (req, res) => {
                  // const id = req.params.doctorid;
                  const { id } = req.params;
                  const query = { _id: new ObjectId(id) };
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
