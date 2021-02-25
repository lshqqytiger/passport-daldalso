let express = require('express'),
	passport = require('passport'),
	DaldalsoStrategy = require("passport-daldalso").Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(
  new DaldalsoStrategy(
    {
      clientID: config.daldalso.clientID,
      clientSecret: config.daldalso.clientSecret,
      callbackURL: config.daldalso.callbackURL,
    },
    function (accessToken, refreshToken, o, done) {
      User.findOne(
        {
          id: o.id,
        },
        function (err, user) {
          if (!user) {
            user = new User({
              key: o.key,
              name: o.name,
              provider: "daldalso",
              profile: o.profile,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

let app = express();

// Express Codes