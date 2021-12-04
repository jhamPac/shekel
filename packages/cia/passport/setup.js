const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy
const User = require("../models/User.js")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(e => {
            done(null)
        })
})

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET,
            callbackURL: "/api/v1/auth/twitter/redirect",
        },
        async (token, tokenSecret, profile, done) => {
            const currentUser = await User.findOne({
                twitterId: profile._json.id_str,
            })

            if (!currentUser) {
                const newUser = await new User({
                    name: profile._json.name,
                    handle: profile._json.screen_name,
                    twitterId: profile._json.id_str,
                    profileImageUrl: profile._json.profile_image_url,
                }).save()

                if (newUser) {
                    done(null, newUser)
                }
            }

            done(null, currentUser)
        }
    )
)

module.exports = passport
