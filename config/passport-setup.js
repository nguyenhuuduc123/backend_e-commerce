const passport = require("passport");
const GoogleStrayegy = require("passport-google-oauth20");

passport.use(
  new GoogleStrayegy({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  () => {}
);
