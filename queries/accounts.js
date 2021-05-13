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


const getUsers = (request, response) => {
    pool.query('SELECT * FROM accounts ORDER BY user_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserByLogin = (username) => {
  
    pool.query('SELECT * FROM accounts WHERE username = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      return results.rows
    })
  }

  const createUser = (body) => {
    const { username, password } = body
    utils.log("Create the user: "+username);
    pool.query('INSERT INTO accounts (username, password) VALUES ($1, $2)', [username, crypto.MD5(password).toString()], (error, results) => {
      if (error) {
        switch (error.constraint) {// in the future we will use email too :))
          case 'accounts_username_key':
            utils.log(`The username ${username} is already in use`);
            return utils.feedback(201,'The username is already in use',username);
            break;
        
          default:
            break;
        }
        throw error
      }
       return utils.feedback(201,'User was created',username);
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE accounts SET name = $1, email = $2 WHERE user_id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM accounts WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const getUserPorId = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM accounts WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.json(results.rows)
    })
  }


  // 
  const getTemp = (request, response) => {
    pool.query('SELECT * FROM regadas ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getLastTemp = (request, response) => {
  
    pool.query('SELECT * FROM regadas ORDER BY id DESC LIMIT 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const postTemp = (request, response) => {
    const { umidade, regada } = request.body
    console.log(request.body)
    pool.query('INSERT INTO regadas (umidade, regada) VALUES ($1, $2)', [umidade, regada], (error, results) => {
      if (error) {
        throw error
      }
       response.status(201).send(`Regada adicionada com o ID: ${results .insertId}`)
    })
  }


  const deleteTemp = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM regadas WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Regada removida de ID: ${id}`)
    })
  }
  //update comando set regar=1 where id=1;

  const updateComandoRegarOn = (request, response) => {  
    pool.query(
      'update comando set regar=1 where id=1;',
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Comando de regar foi enviado`)
      }
    )
  }

  const updateComandoRegarOff = (request, response) => {  
    pool.query(
      'update comando set regar=0 where id=1;',
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Retirando comando de regar`)
      }
    )
  }

  const getComandoRegar = (request, response) => {
    pool.query('SELECT regar FROM comando ORDER BY id DESC LIMIT 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  export default  {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPorId,
    deleteTemp,
    postTemp,
    getLastTemp,
    getTemp,
    updateComandoRegarOn,
    updateComandoRegarOff,
    getComandoRegar,
  }