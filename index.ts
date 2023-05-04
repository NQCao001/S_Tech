import express from 'express';
import {AppDataSource} from "./src/data-source";
// import {router} from "./src/routers/router";
import cors from 'cors';
const app = express();
AppDataSource.initialize().then(() => {
    console.log('Connect Database Success!')
});
app.use(express.json());
app.use(cors())
// app.use('', router);
app.listen(8080, () => {
    console.log('Server is running !')
});