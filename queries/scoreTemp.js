import pg from 'pg';
import dotenv from 'dotenv';
import crypto from 'crypto-js';
import utils from '../utils/utils.js'
dotenv.config();
pg.defaults.ssl = true;


const pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false 
  }
})


async function getAllScore(){
  const client = await pool.connect()
    let retorno = await client.query('SELECT * FROM score_temp where score is not null and nick is not nullORDER BY score desc')
    client.release(true)
    return retorno.rows;
  
  }

  async function insertScore(body){
    const { nick, score } = body
    utils.log("Adding Score Test: "+nick);
    pool.query('INSERT INTO score_temp (nick, score) VALUES ($1, $2)', [nick, score], (error, results) => {
      if (error) {
        console.log("Oh no, some errore happen :c");
        throw error
      }
       return utils.feedback(201,'Score was added',nick);
    })
  }


  export default  {
    getAllScore,
    insertScore,
  }
