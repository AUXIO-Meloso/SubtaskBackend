const User = require('../models/User'); // Schema de usuário
const { compare } = require('bcryptjs');     // Encriptador de senhas
const genToks = require('../utils/tokenGen'); // Função geradora de Tokens
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

module.exports = {
    async register(request, response) {
        const { email, name, password } = request.body;
        try {

            if (await User.findOne({ email })) {
                return response.status(400).json({error: 'User already exists'});
            }

            if (!email){
                return response.json({ error: "Email not informated" });
            }

            if (!password){
                return response.json({ error: "Password not informated" });
            }

            if (!name){
                return response.json({ error: "Name not informated" });
            }

            const user = await User.create(request.body);

            user.password = undefined;

            return response.json({ 
                user,
                token: genToks({ id: user.id })
            });
        } catch(err) {
            return response.status(400).json({error: 'Registration Failed'});
        }
    },

    async authenticate(request, response) {
        const { email, password } = request.body;

        if (!email) {
            return response.json({ error: "Email not informated" })
        }

        if (!password) {
            return response.json({ error: "Password not informated" })
        }

        const user = await User.findOne({ email }).select('+password');

        if(!user) {
            return response.status(400).json({error: 'User not found' });
        }

        if(!await compare(password, user.password)) {
            return response.status(400).json({ error: 'Invalid Password' });
        }

        user.password = undefined;

        return response.json({
            user, 
            token: genToks({ id: user.id })
        });
    },

    async forgot_password(request, response) {
        const { email } = request.body;

        if (!email) {
            return response.json({ error: "Email not informated" });
        }

        try {
            const user = await User.findOne({ email });

            if (!user) 
                return response.status(400).json({error: 'User not found' });
            
            const token = crypto.randomBytes(20).toString('hex'); 

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now 
                }
            });

           await mailer.sendMail({
                to: email,
                from: "groove.street.x@hotmail.com",
                context: { token },
                template: 'auth/forgot_password'
            }, (err) => {
                if(err) {
                    return response.status(400).json({ error: 'Cannot send email' });
                }

                return response.json();
            });

            return response.json({ message: "Token sent successfully" });

        } catch(err) {
            return response.status(400).json({ error: 'Error on forgot password, try again' });
        }
    },

    async reset_password(request, response) {
        const { email, token, password } = request.body;

        if (!email) {
            return response.json({ error: "Email not informated" });
        }

        if (!token) {
            return response.json({ error: "Token not informated" });
        }

        if (!password) {
            return response.json({ error: "Password not informated" });
        }

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');

            if(!user)
                return response.json({ error: "User not found" });
        
            if(token !== user.passwordResetToken)
                return response.json({ error: "Invalid token" });
            
            const now = new Date();
            if(now > user.passwordResetExpires)
                return response.json({ error: "Token expired" });
            
            user.password = password;

            user.save();

            return response.json({ message: "Password update!" });

        } catch (err) {
            response.json({ error: "Cannot reset password, try again" });
        }
    }
}