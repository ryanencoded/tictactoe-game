import express from 'express';
import { AppDataSource } from './data-source';
import routes from "@routes/index";

const port = process.env.PORT || 3001;
const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use(express.json())

    app.use('/api', routes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })