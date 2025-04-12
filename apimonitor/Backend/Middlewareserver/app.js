
import express, { application }  from 'express'
import getInfo from './insertlogs.js';
import clickhouse  from "../connection.js"
import fetchlogs from '../AnalyticalServer/fetchlogs.js';
import monitor from '@devsahil01/apimonitoring'

const app = express();

app.use(monitor())


const PORT = 4000;



app.post('/logData',express.json(),getInfo,async (req,res)=>{
      const log=req.body;

})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
