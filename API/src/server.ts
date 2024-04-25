import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from "express";
import cors from "cors";
import { dbConnect } from './config/database.config';
import { bikes } from './seed.data';
import { BikeModel } from './bikes.model';
import bodyParser from "body-parser";
dbConnect();

const app = express();

app.use(bodyParser.json());
app.use(cors({
    credentials: false,
    origin:["https://localhost:4200"]
}));

app.get("/api/seed", async (req, res) => {
    const bikeCount = await BikeModel.countDocuments();
    if (bikeCount > 0) {
        res.send('already seeded');
    } else {
        await BikeModel.create(bikes);
    }
})

app.get("/api/bikes", async (req, res) => {
    const bikes = await BikeModel.find();
    res.send(bikes);
});

app.get("/api/bike/:id", async (req, res) => {
    const bike = await BikeModel.findById(req.params.id);
    res.send(bike);    
});

app.put("/api/bike/:id", async (req, res) => {
    const bike = await BikeModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(bike);
});

app.post("/api/bike", async (req, res) => {
    const newBike = new BikeModel({...req.body});
    await newBike.save();
    res.send(newBike);
})

app.delete("/api/bike/:id", async (req, res) => {
    const bike = await BikeModel.findByIdAndDelete(req.params.id);
    res.send(bike);
}) 

const port = 5000;

//comment out fot local runs:
app.use(express.static(path.join(__dirname, '../../UI/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../../UI/dist', 'index.html'))
})

app.listen(port, () => {
    console.log("Website serverd on https://localhost:" + port);
});
