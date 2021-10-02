import pg from 'pg';
import dotenv from 'dotenv';
import utils from '../utils/utils.js'
dotenv.config();
pg.defaults.ssl = true;
//TODO: change the Http status code
//TODO: create a pool for use in every request
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


const getUsers = (request , response) => {
    pool.query('SELECT * FROM user_character ORDER BY user_character_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  async function getUserByLogin (userId) {
     const client = await pool.connect()
     let retorno = await client.query('SELECT * FROM user_character WHERE user_id = $1', [userId])
     client.release(true)
     return retorno.rows[0];

  }
  //TODO: Move this to controller
  const createUser = (body) => {
    const { username, password } = body
    utils.log("Create the user: "+username);
    pool.query('INSERT INTO accounts (username, password) VALUES ($1, $2)', [username, crypto.MD5(password).toString()], (error, results) => {
      if (error) {
        switch (error.constraint) {// in the future we will use email too :))
          case 'accounts_username_key':
            utils.log(`The username ${username} is already in use`);
            return utils.feedback(201,'sucess','The username is already in use',username);        
          default:
            break;
        }
        throw error
      }
       return utils.feedback(400,'fail','User was created',username);
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

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM accounts WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.json(results.rows)
    })
  }

  //TODO: Move this to controller
   async function loginInGame (body){// TODO: Return Passwrod or User wrong
    var findUser = await getUserByLogin(body.username);

      if(findUser && findUser.password == crypto.MD5(body.password).toString())
        return utils.feedback(200,'success','The login has done',{atuh:true,token:findUser.token});
      return utils.feedback(400,'fail','User or password was wrong');
  }

  export default  {
    getUsers,
    getUserById,
    createUser,
    updateUser, 
    deleteUser,
    loginInGame,
  }