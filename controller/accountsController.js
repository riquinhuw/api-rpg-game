import accounts from '../queries/accounts.js'
import utils from '../utils/utils.js'

// TODO: Finish the return
 async function createAccount(req) {
    return await accounts.createUser(req.body);
}

async function logingAccount(req) {
    return await accounts.loginInGame(req.body)
}


export default {
    createAccount,
    logingAccount
}