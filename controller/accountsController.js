import accounts from '../queries/accounts.js'
import utils from '../utils/utils.js'

// TODO: Finish the return
function createAccount(req) {
    return accounts.createUser(req.body);
}




export default {

}