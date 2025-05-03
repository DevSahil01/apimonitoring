import { createClient } from "@clickhouse/client";

// const clickhouse=createClient({
//     url: 'https://crnq3xzael.germanywestcentral.azure.clickhouse.cloud:8443',
//     username: 'default',
//     database:"default",
//     password:"Zsdw~ScIK8JHo",
//     database:'default',
//     protocol: 'https',                  
//     tls: {},    
//   })


const clickhouse=createClient({
   host:'http://localhost:8123',
   database:'default',
   username: 'default',
})



async function testConnection() {
  try {
    const result = await clickhouse.query({
      query: 'SELECT 1 as test',
    });
    const data = await result.json();
    console.log('Connection successful:');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await clickhouse.close();
  }
}


export default clickhouse;



testConnection();

