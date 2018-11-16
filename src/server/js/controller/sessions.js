const jwt = require('jsonwebtoken');
const async_jwt = require('../utils/jsonwebtoken_promisified.js');

// sessions are being tracked in memory
// WARNING this will not work with multiple deployed instances
var sessions = {};



async function verify (token)
{

}


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

    var cert = process.env.JWT_PRIVATE_KEY;
    if (!cert) throw "NO_PRIVATE_KEY_PROVIDED";
    var token = jwt.sign(payload, cert, { algorithm: 'RS256'});

}


async function revoke (token, verify=true)
{
    if (verify)
    {
        // verify token is valid
    }

    // delete token from sessions
}


async function read (token, verify=true)
{
    if (verify)
    {
        // verify token is valid
    }

    // parse and return payload
}
