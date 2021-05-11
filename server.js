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

app.listen(3000);