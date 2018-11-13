const rp = require('../../utils/request_promisified.js');

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;


function FirebaseErrorHelper(body, fb_error_messages) {
    /*
      Params:
          body: Json object returned from a firebase api call that had
                a non 200 status code.
          fb_error_messages: Array of error messages (strings).

      Returns:
          String with an error message
     */
    if ('error' in body && 'message' in body.error)
    { // error from firebase
        // check if error message is in the provided array
        if (fb_error_messages.indexOf(body.error.message) !== -1)
        {
            return body.error.message;
        }
        else
        { // undocumented error message was sent from firebase
            return 'UNKNOWN_ERROR';
        }
    }
    else
    { // unable to parse an error from firebase
        return 'UNKNOWN_ERROR';
    }
};


async function signUpWithEmailAndPassword(email, password) {
    /*
      Params:
          email: Email of the user to sign up
          password: Password for the new account

      Desc:
          Takes a users email and password to create a new account. In
          exchange an ID token, refresh token, uid, and an ID token
          expiration time is returned on success.

      Rejects:
          // Custom Errors
          CONNECTION_ERROR: Connection failed, try again maybe?
          UNKNOWN_ERROR: Unkown error occurred.

          // Firebase Errors
          EMAIL_EXISTS: The email address is already in use by another account.
          OPERATION_NOT_ALLOWED: Password sign-in is disabled for this project.
          TOO_MANY_ATTEMPTS_TRY_LATER: We have blocked all requests from this device due to unusual activity. Try again later.

      Resolves: an object containing an ID token, time in seconds when the ID token expires, Refresh Token, and an UID.
          example: {id_token: '...', expires_in: '...', refresh_token: '...', uid: '...'}

    */

    var options = {
        uri: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        json: true,
        body: {
            email: `${email}`,
            password: `${password}`,
            returnSecureToken: true // should always be true
        }
    };

    try {
        var response = await rp(options);
    }
    catch (err) {
        throw 'CONNECTION_ERROR';
    }

    var res = response.res;
    var body = response.body;

    if (res.statusCode == 200) { // status code is 200: OK
        return {id_token: body.idToken,
                expires_in: body.expiresIn,
                refresh_token: body.refreshToken,
                uid: body.localId};
    }
    else
    { // something went wrong
        const fb_error_messages = ['EMAIL_EXISTS', 'OPERATION_NOT_ALLOWED', 'TOO_MANY_ATTEMPTS_TRY_LATER'];
        throw FirebaseErrorHelper(body, fb_error_messages);
    }
};

module.exports.signUpWithEmailAndPassword = signUpWithEmailAndPassword;


async function signInWithEmailAndPassword(email, password) {
    /*
      Params:
          email: Email of the user to sign in
          password: Password for the existing account

      Desc:
          Takes a users email and password to login to firebase. In
          exchange an ID token, refresh token, uid, and an ID token
          expiration time is returned on success.

      Rejects:
          // Custom Errors
          CONNECTION_ERROR: Connection failed, try again maybe?
          UNKNOWN_ERROR: Unkown error occurred.

          // Firebase Errors
          EMAIL_NOT_FOUND: There is no user record corresponding to this identifier. The user may have been deleted.
          INVALID_PASSWORD: The password is invalid or the user does not have a password.
          USER_DISABLED: The user account has been disabled by an administrator.

      Resolves: an object containing an ID token, time in seconds when the ID token expires, Refresh Token, and an UID.
          example: {id_token: '...', expires_in: '...', refresh_token: '...', uid: '...'}

    */

    var options = {
        uri: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        json: true,
        body: {
            email: `${email}`,
            password: `${password}`,
            returnSecureToken: true // should always be true
        }
    };

    try {
        var response = await rp(options);
    }
    catch (err) {
        throw 'CONNECTION_ERROR';
    }

    var res = response.res;
    var body = response.body;

    if (res.statusCode == 200) { // status code is 200: OK
        return {id_token: body.idToken,
                expires_in: body.expiresIn,
                refresh_token: body.refreshToken,
                uid: body.localId};
    }
    else
    { // something went wrong
        const fb_error_messages = ['EMAIL_NOT_FOUND', 'INVALID_PASSWORD', 'USER_DISABLED'];
        throw FirebaseErrorHelper(body, fb_error_messages);
    }
};

module.exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
