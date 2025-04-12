// app.get('/gettotal',async (req,res)=>{
//     console.log('get request')
//     const result = await clickhouse.query({
//       query:"SELECT COUNT(id) FROM requests",
//       format:"JSON"
//   }).then(res=>res.json())
  
//      res.status(200).send(result.data[0]['COUNT(id)'])
//   })
  
//   app.get('/gettotalErr',async (req,res)=>{
//     console.log('get request')
//     const result = await clickhouse.query({
//       query:"SELECT COUNT(id) FROM requests WHERE status_code=404 OR status_code=500",
//       format:"JSON"
//   }).then(res=>res.json())
  
//      res.status(200).send(result.data[0]['COUNT(id)'])
//   })
  
  
//   app.get("/getAvgResTime",async (req,res,next)=>{
//       console.log("calculating avg")
//       const result = await clickhouse.query({
//            query:"SELECT AVG(response_time_ms) FROM requests WHERE status_code=200 OR status_code=304",
//            format:"JSON"
//       })
//       .then(res=>res.json())
  
  
//       res.json(result.data[0]['AVG(response_time_ms)'])
//   })
  
//   app.get('/getlogs',(req,res)=>{
//         fetchlogs().then((result)=>{
//             res.json(result.data)
//         })
//   })