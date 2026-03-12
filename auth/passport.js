const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

//creating the local strategy here

passport.use(
    new LocalStrategy(async(username, password, done) => {
        try{
            const user = await User.findOne({username}); // this is equal to {username: username}
            // finding the value with the keyvalue of username with the variable username value
            if(!user) return done(null, false);

            const ok = await bcrypt.compare(password, user.passwordHash); // true/false
            if (!ok) return done(null, false);
            
            //if everythings checks out we will return the user
            return done(null, user);
        }catch(err){
            return done(err)
        }
    })
)

//define what is stored in the session cookie

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    try{
        const user = await User.findById(id).select("username");
        done (null, user);
    }catch(err){
        done(err);
    };
});

module.exports = passport;