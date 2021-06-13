

function log(mensagem) {
    var now = new Date();
  console.log(String(now.getDate()).padStart(2, '0')+"/"+String(now.getMonth() + 1).padStart(2, '0')+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+" - "+mensagem);
}

function feedback(status,description,object={}) {
    return {"status":status,"description":description,"object":object};
}

export default {
    log,
    feedback
}