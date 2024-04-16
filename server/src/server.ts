import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes"; //add this after the last import

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
const PORT = process.env.PORT;
const { ATLAS_URI } = process.env;
// const uri = process.env.ATLAS_URI

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/employees", employeeRouter); //Telling it that the employees and to use the emplyeeRouter
    // start the Express server: npx ts-node src/server.ts
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}...`);
    });

    module.exports = app;
  })
  .catch((error) => console.error(error));

  
