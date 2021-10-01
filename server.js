import express from 'express';
const app = express();
import {wellcome} from './infos/wellcome.js';
import {routes} from './infos/routes.js';
import repoAccount from './queries/accounts.js';
import {config} from "dotenv-safe";
import jwt from 'jsonwebtoken';
import utils from './utils/utils.js';
import accountsController from './controller/accountsController.js';
import {router} from "./routes.js";
import helmet from 'helmet';
import cors from 'cors';
import { body, validationResult } from'express-validator';

//import * as repoAccount from "./queries/accounts.js";
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(router);

/*
//authentication
app.post('/login', (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  if(req.body.user === 'luiz' && req.body.password === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET_JWT, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(500).json({message: 'Login inválido!'});
});
*/

// ...rest of the initial code omitted for simplicity.

/*
// Express validator
app.post(
  '/user',
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);
*/
  
utils.log("Starting RPG GAME API")

  app.listen(process.env.PORT || 3333, ()=>{
    //console.log('Listen in port 3333.');
  });
