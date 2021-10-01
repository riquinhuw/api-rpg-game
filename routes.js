import { Router } from "express";
import {wellcome} from './infos/wellcome.js';
import {routes} from './infos/routes.js';
import accounts from './queries/accounts.js';
import scoreTemp from './queries/scoreTemp.js';
import accountsController from './controller/accountsController.js';
import rt from './queries/redisToken';

const router = Router();

router.get('/', (req, res) => {
    res.send(wellcome);
});

router.get('/routes', (req, res) => {
    res.send(routes);
});

router.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
});

router.post('/create', async function (req, res) {
    res.send(await accounts.createUser(req));
});

router.post('/login', async function (req, res) {
    res.send(await accountsController.logingAccount(req));
});

router.get('/tempscore', async function (req, res) {
    res.status(200).json(await scoreTemp.getAllScore());
});

router.post('/tempscore',async function (req, res) {
    res.send(await scoreTemp.insertScore(req.body));
});

router.get('/redistest',async function (req,res) {
   res.send(await rt.redisTest()); 
});



export { router }