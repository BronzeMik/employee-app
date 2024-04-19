import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "../src/database";
import { employeeRouter } from "../src/employee.routes"; //add this after the last import

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;
// const uri = process.env.ATLAS_URI

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}
const app = express();
connectToDatabase(ATLAS_URI)
  .then(() => {
    
    const corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
    }
    app.use(cors(corsOptions));
    app.use("/employees", employeeRouter); //Telling it that the employees and to use the emplyeeRouter
    // start the Express server: npx ts-node src/server.ts
    app.get('/', (req, res) => {
      res.send('connected!').status(200)
    })
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));

  export default app
  

  
