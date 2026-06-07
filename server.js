import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "public/index.html");
})

const API_URL = "https://v2.jokeapi.dev/joke/";

app.post("/api/getJoke", async (req,res)=>{
    const category = req.body.category;
    try{
        const result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?type=single`);
        const jokeText = result.data.joke;

        res.json({success : true, joke: jokeText});
    }catch(error){
        console.log("API error", error.message);
        res.json({success:false, error: "Network issue hai"});
    }
})
app.listen(PORT,()=>{
    console.log("APP is running on port 3000");
})