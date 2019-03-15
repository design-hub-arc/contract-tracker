const jwt = require('jsonwebtoken');
const uuid = require('uuidv4');
const redis = require("redis");

const async_jwt = require('../utils/jsonwebtoken_promisified.js');
const knex = require("./postgresql.js");

const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;

const private_key = process.env.JWT_PRIVATE_KEY;
const public_key = process.env.JWT_PUBLIC_KEY;
const jwt_options = { algorithm: 'RS256'};


if (!private_key) return Promise.reject("NO_PRIVATE_KEY_PROVIDED");


// Using redis to track sessions
var client = redis.createClient({
      host: redis_host,
      port: redis_port
    });

client.on("error", function (err) {
  console.log("Error " + err);
});


function promisifyRedis (client, func)
{
  return function newFunction ()
  {
    return new Promise((resolve, reject) => {
      var params = Array.from(arguments);
      params.push((err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
      console.log(params);
      func.apply(client, params);
    });
  };
}


["ping", "set", "get", "del", "hmset", "hdel", "hmget", "expire", "hgetall", "lrange"].forEach(eta => {
  client["async_" + eta] = promisifyRedis(client, client[eta]);
});


async function verify (token)
{
  var payload = jwt.verify(token,
                           public_key,
                           {algorithms: ['RS256'], ignoreExpiration: true});
  if (payload.exp < Date.now())
  {
    return Promise.reject("TOKEN EXPIRED");
  }

  try
  {
    await client.async_get(payload.jti);
  }
  catch (err)
  {
    return Promise.reject(Error("TOKEN REVOKED"));
  }

  return payload;
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

  try
  {
    await client.async_set(token_id, 1, 'PX', time_to_live);
  }
  catch (err)
  {
    return Promise.reject(err);
  }

  var payload = {
    sub: user_id,
    iat: current_datetime,
    exp: expiration_datetime,
    jti: token_id
  };

  return {encoded: jwt.sign(payload, private_key, jwt_options), payload: payload};
}

module.exports.create = create;



async function revoke (token)
{
  try
  {
    var payload = await verify(token);
    await client.async_del(payload.jti);
  }
  catch (err)
  {
    return Promise.reject(err);
  }

  return true;
}

module.exports.revoke = revoke;
