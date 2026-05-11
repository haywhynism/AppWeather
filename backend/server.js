import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "Unable to fetch weather data" });
    }

    res.json(data); 
  } catch (error) {
    res.status(500).json({error: "Failed to fetch weather data" });
  }
});

app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }
  
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    
    const data = await response.json();
    res.json(data);
  } catch(error) {
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

