var GooglePlusTokenStrategy = require("passport-google-plus-token");
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, next) {
      User.findOrCreate({ "google.id": profile.id }, function (error, user) {
        return next(error, user);
      });
    }
  )
);

app.get("/auth/google", passport.authenticate("google-plus-token"));
