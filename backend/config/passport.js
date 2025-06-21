import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import Auth from "../models/auth.model.js";
import dotenv from "dotenv";
dotenv.config();
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await Auth.findById(id);
  done(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      let user = await Auth.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = await Auth.create({
          email: profile.emails[0].value,
          provider: "google",
        });
      }
      done(null, user);
    }
  )
);
