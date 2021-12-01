const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET,
            callbackURL: "/auth/twitter/redirect",
        },
        () => {
            console.log("something happened")
        }
    )
)

module.exports = passport
