import { createClient } from '@clickhouse/client';

// const clickhouse=createClient({
//     url: 'https://crnq3xzael.germanywestcentral.azure.clickhouse.cloud:8443',
//     username: 'default',
//     database:"default",
//     password:"Zsdw~ScIK8JHo",
//     database:'default',
//     protocol: 'https',                  
//     tls: {},    
//   })


const client=createClient({
   host:'http://localhost:8123',
   database:'default'
})



async function testConnection() {
  try {
    const result = await client.query({
      query: 'SELECT 1 as test',
    });
    const data = await result.json();
    console.log('Connection successful:', data);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await client.close();
  }
}






testConnection();

export default client;