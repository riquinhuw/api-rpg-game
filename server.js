import express from 'express';
const app = express();
import {wellcome} from './infos/wellcome.js';
import {routes} from './infos/routes.js';
import repoAccount from './queries/accounts.js';
import {config} from "dotenv-safe";
import jwt from 'jsonwebtoken';
import accounts from './queries/accounts.js';
import utils from './utils/utils.js'
//import * as repoAccount from "./queries/accounts.js";
app.use(express.json());

app.get('/', (req, res) => {
  res.send(wellcome);
});

app.get('/routes', (req, res) => {
    res.send(routes);
  });

app.get('/accounts',(req,res)=>{
  res.send(repoAccount.getUsers());
});

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

app.post('/logout', function(req, res) {
  res.json({ auth: false, token: null });
});

app.post('/create', function(req, res) {
  res.send(accounts.createUser(req));
});
  
utils.log("Starting RPG GAME API")

  app.listen(process.env.PORT || 3333, ()=>{
    //console.log('Listen in port 3333.');
  });