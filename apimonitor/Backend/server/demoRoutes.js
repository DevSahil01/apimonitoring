import express from 'express'
const demoRouter = express.Router();
import logHandler from '../Middlewareserver/insertlogs.js';
import auth from '../middleware/auth.js';


import {createMonitor} from '@devsahil01/apimonitoring';

const monitor = createMonitor(
   '682a36d3e43e2fefe5a7c979',
    '6a669c59e3f080595602f4d5a27b135d47607c984deb5cb5135804df928a82b5'
)




demoRouter.post('/logData', logHandler,async (req, res) => {
   const log = req.body;
   console.log(req.body)
   res.send('hello')
})


demoRouter.get('/viewimage',monitor,(req,res)=>{
    res.status(200).send('images ')
})


demoRouter.get('/getimages',monitor,(req,res)=>{
    res.status(200).send('get all images  ')
})


demoRouter.post("/login", monitor , async (req, res) => {
   try {
      setTimeout(() => {
        res.json({ id: 1 });
      }, 1000);
    } catch (err) {
      next(err); 
    }
  // res.status(500).send("error from login ")
})

demoRouter.get("/homepage", monitor,async (req, res) => {
   res.send("home page ")
})

demoRouter.delete("/delete", monitor,async (req, res) => {
   try {
      setTimeout(() => {
        res.send(" data deleted ")
      }, 7000);
    } catch (err) {
      next(err); 
    }
})

demoRouter.put("/change", monitor,async (req, res) => {
  //  try {
  //     res.send('hello')
  //   } catch (err) {
  //     res.status(500).send('server error ')
  //     next(err); 
  //   }
  res.status(401).send("unauthorized")
})


demoRouter.get('/pagenot', monitor, async (req, res) => {
   res.status(404).send('Page not found');
 });
 
 
 demoRouter.get('/crash', monitor, async (req, res) => {
   // This will crash
   // const result = nonExistentFunction(); // undefined function
   res.status(500).send("crash ");
 });
 

 demoRouter.post('/badjson', monitor, express.text(), async (req, res) => {
   try {
     JSON.parse(req.body); // client should send invalid JSON to trigger this
     res.send('JSON parsed successfully');
   } catch (err) {
     res.status(400).send('Invalid JSON payload');
   }
 });
 
 demoRouter.get('/timeout', monitor, async (req, res) => {
   await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds
   res.send('Delayed response');
 });
 

 demoRouter.get('/unhandled', monitor, async (req, res) => {
   res.status(500).send(new Error('error'))
 });

demoRouter.get('*', monitor,(req, res) => {
   res.status(404).json({ message: 'This resource was not found (simulated)' });
});


demoRouter.use((req, res) => {
   res.status(404).json({ message: 'Route not found' });
});

export default demoRouter;