const _   = require('lodash');
const gcp = require('../utils/gcp.js');

const createGoogleSignInURL = _.memoize(() => {
  var google_oauth2 = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  var callback_oauth2;
  if (gcp.isDeployedOnGCP())
  {
    callback_oauth2 = new URL(process.env.PUBLIC_URL);
  }
  else
  {
    callback_oauth2 = new URL("http://localhost");
  }

  callback_oauth2.pathname = "/auth/google/callback";

  var params = [{ key: 'client_id',      value: process.env["GOOGLE_OAUTH2_CLIENT_ID"]},
                { key: "redirect_uri",   value: callback_oauth2.href },
                { key: "scope",          value: "profile email openid" },
                { key: "response_type",  value: "code" }];

  params.forEach(param => {
    google_oauth2.searchParams.append(param.key, param.value);
  });

  return google_oauth2.toString();
});


exports.run = (req, res) => {
  const data = {
  site_name: 'DH Contract Tracker',
  google_oauth2_url: createGoogleSignInURL()
  };

  return data;
};
