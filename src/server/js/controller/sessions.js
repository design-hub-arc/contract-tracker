const jwt = require('jsonwebtoken');
const async_jwt = require('../utils/jsonwebtoken_promisified.js');

const private_key = process.env.JWT_PRIVATE_KEY;
const public_key = process.env.JWT_PUBLIC_KEY;
const jwt_options = { algorithm: 'RS256'};

// sessions are being tracked in memory
// WARNING this will not work with multiple deployed instances
var sessions = {};



async function verify (token)
{
    if (!public_key) throw "NO_PUBLIC_KEY_PROVIDED";
    return jwt.verify(token, public_key, {algorithms: ['RS256'], ignoreExpiration: true});
}

module.exports.verify = verify;


async function create (uid)
{
    // TODO get unique token id (must only be unique per uid)
    var token_uid = 0;

    // set expiration date to +30m
    var payload = {
        sub: uid,
        iat: Date.now(),
        exp: new Date(Date.now() + 1000 * 60 * 30).getTime(),
        jti: token_uid
    };

    if (!private_key) throw "NO_PRIVATE_KEY_PROVIDED";
    return {encoded: jwt.sign(payload, private_key, jwt_options), payload: payload};
}

module.exports.create = create;


async function revoke (token, verify=true)
{
    if (verify)
    {
        // verify token is valid
    }

    // delete token from sessions
}

module.exports.revoke = revoke;


async function read (token, verify=true)
{
    if (verify)
    {
        // verify token is valid
    }

    // parse and return payload
}
module.exports.read = read;
