const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const fb_auth      = require('../model/services/firebaseauthapi.js');
const session      = require('../controller/sessions.js');
const request      = require('../utils/request_promisified.js');

const router = express.Router();


// Receive auth code
router.get('/callback', async (req, res, next) => {
  if (req.query.error)
  {
    console.error(req.query.error);
    res.redirect("/?status=failure");
  }
  else if (req.query.code)
  {
    //TODO verify input
    let code = req.query.code;
    console.log(code);

    let options = {
      method: "POST",
      uri: "https://www.googleapis.com/oauth2/v4/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      form: {
        code: code,
        client_id: process.env.GOOGLE_OAUTH2_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
        redirect_uri: "http://localhost/auth/google/callback",
        grant_type: "authorization_code"
      }
    };

    await request(options)
      .then(data => {
        let res = data.res;
        let body = data.body;

        if (res && res.statusCode)
        {
          if (res.statusCode != 200)
          {
            throw Error(`Status code: ${res.statusCode} was returned`);
          }
          else
          {
            console.log(res);
          }
        }
        else
        {
          throw Error("No response was provided");
        }
      })
      .catch(err => console.error(err));


    res.redirect("/?status=success");
  }
});


// keep at bottom of file
module.exports = router;
