import express from "express";
import { calculateBmi, parsedArguments } from "./bmiCalculator";
import {
  calculateExercises,
  parsedArgumentsExercise
} from "./exerciseCalculator";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello full stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  if (!weight || !height) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const heightAndWeight = ["null", "null", String(height), String(weight)];
    try {
      const { height, weight } = parsedArguments(heightAndWeight);
      const bmi: string = calculateBmi(height, weight);
      res.send({ weight: weight, height: height, bmi: bmi });
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(400).send({ error: error.message });
      res.status(400);
    }
  }
});

app.post("/exercise", (req, res) => {     
  const daily_exercises: string[]  = req.body.daily_exercises;  
  const tempTarget: string = req.body.target;

  if (!daily_exercises || !tempTarget)
    res.status(400).send({ error: "parameters missing" });
  else if (
    !(daily_exercises instanceof Array) ||
    !(!isNaN(Number(tempTarget)))
  )
    res.status(400).send({ error: "malformatted parameters" });

  try {  
    daily_exercises.unshift(tempTarget); // ugly hacks begin here to make it parser-compatible
    daily_exercises.unshift(''); 
    daily_exercises.unshift(''); // and end here, hopefully   
    const { target, hours } = parsedArgumentsExercise(daily_exercises);
    res.send(calculateExercises(hours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
    res.status(400);
  }
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
