const google = require('googleapis').google;

// CONFIGURATION
const googleConfig = {
  clientId: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  redirect: process.env.OAUTH2_CALLBACK // this must match your google api settings
};

/** This scope tells google what information we want to request. */
const infoScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

/** Get a url which will open the google sign-in page and request
 * access to the scope provided (such as calendar events). */
const getConnectionUrl = auth => {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: infoScope,
    clientId: googleConfig.clientId,
    redirect_uri: googleConfig.redirect
  });
};

/** Create the google auth object which gives us access to talk to google's apis. */
const createConnection = () => {
  return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
  );
};

// MAIN
/** Part 1: Create a Google URL and send to the client to log in the user. */
const getUrl = async () => {
  try {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
  } catch (error) {
    throw error;
  }
};

/** Part 2: Take the "code" parameter which Google gives us
 *once when the user logs in, then get the user's email and id. */
const callback = async code => {
  try {
    const auth = createConnection();
    // get the auth "tokens" from the request
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    //console.log(data);
    // add the tokens to the google api so we have access to the account
    auth.setCredentials(tokens);
    // connect to google - need this to get the user's email
    const gooauth = await google.oauth2('v2').userinfo.get({auth: auth});
    // //const gooauth = await plus.people.get({ userId: 'me' });

    let lvl = 1;
    if(gooauth.data.hd == 'iit.edu') {
      lvl = 63;
    }

    let doc = {
      gId: gooauth.data.id,
      email: gooauth.data.email,
      family_name: gooauth.data.family_name,
      given_name: gooauth.data.given_name,
      locale: gooauth.data.locale,
      picture: gooauth.data.picture,
      verified_email: gooauth.data.verified_email,
      authlvl: lvl
    };
    return doc;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUrl,
  callback
};

/*** Add Mock users ***/
/*
  let gooauthM = {
      id: 123456789123456789123,
      email: 'prueba@iit.edu',
      hd: 'iit.edu',
      family_name: 'Hajek',
      given_name: 'Jeremy'
  };
  let lvl = 1;
  if(gooauthM.hd == 'iit.edu') {
    lvl = 63;
  }
  let userG = new Model({
    gId: gooauthM.id,
    email: gooauthM.email,
    family_name: gooauthM.family_name,
    given_name: gooauthM.given_name,
    locale: gooauth.data.locale,
    picture: gooauth.data.picture,
    verified_email: gooauth.data.verified_email,
    authlvl: lvl
  });
  return userG;
}
*/