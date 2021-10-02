import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();
const {REDIS_HOST,REDIS_PORT,REDIS_PASSWORD,REDIS_STRING} = process.env;

/**
 * Yo! idk why, but i cant use the Redis on Node ;-;
 * i got this erro:
 * Error: read ECONNRESET
    at TCP.onStreamRead (node:internal/stream_base_commons:211:20) {
  errno: -104,
  code: 'ECONNRESET',
  syscall: 'read'
}
 * if you know how i can resolve this, plz share <3 
 */

const redisConfig= {
    host:REDIS_HOST,
    port:REDIS_PORT,
    password:REDIS_PASSWORD,
    family: 4,
    db:0
}


function redisTest () {
  let retorno ='';
  const redis = new Redis(REDIS_STRING); // uses defaults unless given configuration object
redis.on('error',function(err){ console.error(err)})
// ioredis supports all Redis commands:
redis.set("foo", "bar"); // returns promise which resolves to string, "OK"

// the format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
// the js: ` redis.set("mykey", "Hello") ` is equivalent to the cli: ` redis> SET mykey "Hello" `

// ioredis supports the node.js callback style
redis.get("foo", function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Promise resolves to "bar"
    retorno=result;
  }
  return retorno;
});

}



export default  {
  redisTest
}