const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});

let doctorCollection;
let appointmentCollection;

async function connectDB() {
      await client.connect();
      const db = client.db("docappoint");
      doctorCollection = db.collection("doctors");
      appointmentCollection = db.collection("appointments");
      console.log("Connected to MongoDB");
}

connectDB().catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
});

app.get("/", (req, res) => {
      res.send("docappoint server is running");
});

app.post("/appointments", async (req, res) => {
      try {
            const result = await appointmentCollection.insertOne(req.body);
            console.log("Appointment created:", result.insertedId);
            res.json({ success: true, insertedId: result.insertedId });
      } catch (error) {
            console.error("POST /appointments error:", error.message);
            res.status(500).json({ success: false, error: error.message });
      }
});

app.get("/appointments", async (req, res) => {
      try {
            const result = await appointmentCollection.find().toArray();
            console.log(`GET /appointments — ${result.length} found`);
            res.json(result);
      } catch (error) {
            console.error("GET /appointments error:", error.message);
            res.status(500).json({ success: false, error: error.message });
      }
});

app.put("/appointments/:id", async (req, res) => {
      try {
            const { id } = req.params;
            const result = await appointmentCollection.updateOne(
                  { _id: new ObjectId(id) },
                  { $set: req.body }
            );
            console.log(`PUT /appointments/${id} — modified: ${result.modifiedCount}`);
            res.json({ success: true, modifiedCount: result.modifiedCount });
      } catch (error) {
            console.error("PUT /appointments/:id error:", error.message);
            res.status(500).json({ success: false, error: error.message });
      }
});

app.delete("/appointments/:id", async (req, res) => {
      try {
            const { id } = req.params;
            const result = await appointmentCollection.deleteOne({ _id: new ObjectId(id) });
            console.log(`DELETE /appointments/${id} — deleted: ${result.deletedCount}`);
            res.json({ success: true, deletedCount: result.deletedCount });
      } catch (error) {
            console.error("DELETE /appointments/:id error:", error.message);
            res.status(500).json({ success: false, error: error.message });
      }
});

app.get("/all-appointments", async (req, res) => {
      try {
            const result = await doctorCollection.find().toArray();
            console.log(`GET /all-appointments — ${result.length} found`);
            res.json(result);
      } catch (error) {
            console.error("GET /all-appointments error:", error.message);
            res.status(500).json({ success: false, error: error.message });
      }
});

app.get("/all-appointments/:id", async (req, res) => {
      try {
            const { id } = req.params;
            const result = await doctorCollection.findOne({ _id: new ObjectId(id) });
            if (!result) {
                  console.warn(`GET /all-appointments/${id} — not found`);
                  return res.status(404).json({ success: false, error: "Doctor not found" });
            }
            console.log(`GET /all-appointments/${id} — found: ${result.name}`);
            res.json(result);
      } catch (error) {
            console.error("GET /all-appointments/:id error:", error.message);
            res.status(500).json({ success: false, error: error.message });
      }
});

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});