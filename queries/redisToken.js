import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();
const {REDIS_HOST,REDIS_PORT,REDIS_PASSWORD,REDIS_STRING} = process.env;


const redisConfig= {

    host:REDIS_HOST,
    port:REDIS_PORT,
    password:REDIS_PASSWORD,
    family: 4,
    db:0
}


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
  }
});
