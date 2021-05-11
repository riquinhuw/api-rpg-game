import express from 'express';
const app = express();
import {wellcome} from './infos/wellcome.js';
import {routes} from './infos/routes.js';


app.get('/', (req, res) => {
  res.send(wellcome);
});

app.get('/routes', (req, res) => {
    res.send(routes);
  })
  
  var dia = new Date();
  console.log("Starting RPG GAME API. "+String(dia.getDate()).padStart(2, '0')+"/"+String(dia.getMonth() + 1).padStart(2, '0')+"/"+dia.getFullYear()+" "+dia.getHours()+":"+dia.getMinutes()+":"+dia.getSeconds());


  app.listen(process.env.PORT || 3333, ()=>{
    console.log('Listen in port 3333.')
  });