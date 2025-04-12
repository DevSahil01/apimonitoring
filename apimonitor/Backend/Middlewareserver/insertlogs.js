import clickhouse from '../connection.js';



async function insertlogs(method,url,statusCode,duration,req,res,next){
     try{
        await clickhouse.insert({
            table:'requests',
            values:[
                {
                     id:3,
                     url:url,
                     status_code:statusCode,
                     response_time_ms:Math.floor(duration),
                     reqMethod:method,
                     timestamp:new Date().toISOString().replace('T',' ').slice(0,19)
                }
            ],
            format:"JSONEachRow"
         })
         
         console.log("log inserted")
     }
     catch(err){
          console.error("Error querying clickhouse ", err)
     }
}



async function   getInfo(req,res,next){
    const {method,url,status,responseTime,timestamp}=req.body


    try{
        insertlogs(method,url,status,responseTime,req,res,next);

        res.send("Your log is inserted successfully ")
    }
    catch(err){
         res.send("Error while logging your request.")
    }
  
    

    
    next()
}

export default getInfo;