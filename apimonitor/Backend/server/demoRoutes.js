import express from 'express'
const demoRouter = express.Router();
import logHandler from '../Middlewareserver/insertlogs.js';
import createMonitor from '../../../npm_module/index.js';
import auth from '../middleware/auth.js';

const monitor = createMonitor(
   '681534d8060da104357abe87', 'cad92ef8c9b2e80a8e8fdc429ef4128d188581c2a7e199ae4593af013d4f10d0'
)


demoRouter.post('/logData', logHandler,async (req, res) => {
   const log = req.body;
   console.log(req.body)
   res.send('hello')
})



demoRouter.post("/login", monitor , async (req, res) => {
   try {
      setTimeout(() => {
        res.json({ id: 1 });
      }, 5000);
    } catch (err) {
      next(err); 
    }
})

demoRouter.get("/homepage", monitor,async (req, res) => {
   res.send("home page ")
})

demoRouter.delete("/delete", monitor,async (req, res) => {
   try {
      setTimeout(() => {
        res.send(" data deleted ")
      }, 10000);
    } catch (err) {
      next(err); 
    }
})

demoRouter.put("/change", monitor,async (req, res) => {
   try {
      setTimeout(() => {
        res.send("changed data")
      }, 7000);
    } catch (err) {
      next(err); 
    }
})


demoRouter.get('/pagenot', (req, res) => {
   res.status(404).json({ message: 'This resource was not found (simulated)' });
});


demoRouter.use((req, res) => {
   res.status(404).json({ message: 'Route not found' });
});

export default demoRouter;