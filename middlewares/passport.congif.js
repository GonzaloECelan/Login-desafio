const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {createHash, validPassword} = require('../utils/utils');
const {userModel} = require('../models/users.model');


passport.use('register', new LocalStrategy(
    {passReqToCallback:true, usernameField:'email'},
    async (req,username,password,done) =>{

        const {first_name,last_name,age} = req.body;
        try {
            const user = await userModel.findOne({email:username})
            if(user){
                done(null,false)
                return
            }else{
                const newUser ={
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password: createHash(password)
                }

                const userDB = await userModel.create(newUser)
                done(null,userDB)
            }
        } catch (error) {
            done(error)
        }
    }
))


module.exports = passport;