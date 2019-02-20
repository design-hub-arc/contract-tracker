const jwt = require('jsonwebtoken');
const uuid = require('uuidv4');
const async_jwt = require('../utils/jsonwebtoken_promisified.js');
const redis = require("redis");

const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;

const private_key = process.env.JWT_PRIVATE_KEY;
const public_key = process.env.JWT_PUBLIC_KEY;
const jwt_options = { algorithm: 'RS256'};


// Using redis to track sessions
var client = redis.createClient({
      host: redis_host,
      port: redis_port
    });

client.on("error", function (err) {
  console.log("Error " + err);
});



async function verify (token)
{
  if (!public_key) throw "NO_PUBLIC_KEY_PROVIDED";
  var payload = jwt.verify(token,
                           public_key,
                           {algorithms: ['RS256'], ignoreExpiration: true});
  if (payload.exp < Date.now())
  {
    throw "TOKEN EXPIRED";
  }

  return new Promise((resolve, reject) => {
    client.get(payload.jti, (err, reply) => {
      if (err)
      {
        reject(Error("TOKEN REVOKED"));
      }

      resolve(payload);
    });
  });
}

module.exports.verify = verify;



async function create (user_id)
{
  // get unique token id (Not guranteed but nearly impossible to occur)
  // the chance of a collision is: 1 in roughly 3.4E^38
  var token_id = uuid();

  // set expiration date to +30m
  var time_to_live = 1000 * 60 * 30;
  var current_datetime = Date.now();
  var expiration_datetime = new Date(current_datetime + time_to_live).getTime();

  client.set(token_id, 1, 'PX', time_to_live, (err, reply) => {
    console.log(err, reply);
  });

  var payload = {
    sub: user_id,
    iat: current_datetime,
    exp: expiration_datetime,
    jti: token_id
  };

  if (!private_key) throw "NO_PRIVATE_KEY_PROVIDED";
  return {encoded: jwt.sign(payload, private_key, jwt_options), payload: payload};
}

module.exports.create = create;



async function revoke (token)
{
  var payload = await verify(token);
  client.del(payload.jti, (err, reply) => {});
}

module.exports.revoke = revoke;
