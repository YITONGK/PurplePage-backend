const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

// link to user model
const { User } = require('../models');

// register a user (POST)
const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }).catch((err) => {
            if (err) {
                throw err;
            }
        });
        return res.send(user);
    } catch {
        return res.send([]);
    }
}

// get a user by email
const getUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    })
}

// get a user by id
const getUserById = async (id, done) => {
    return await User.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        done(null, user);
    });
}

// view a user by id (GET)
const viewUserById = async (req, res) => {
    // search for user in the database via ID
    await User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if (user) {
            return res.send(user); // send back the user details
        } else {
            return res.send([]);
        }
    });
}

// get a user based on email
const getUser = async (req, res) => {
    // search for user in the database via email
    await User.findOne({
        where: {
            email: req.params.email
        }
    }).then((user) => {
        if (user) {
            return res.send(user);
        } else {
            return res.send([]);
        }
    })
}

// get all users
const getAllUsers = async (req, res) => {
    await User.findAll().then((users) => {
        return res.send(users);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// prevent user from accessing certain routes when not authenticated
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// logout a user (DELETE)
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            throw err;
        }
    });
    res.redirect('/login');
}

// update a user (POST)
const editUser = async (req, res) => {
    // get the data sent from the frontend
    const { id, name, email } = req.body;

    // save the user info
    const userInfo = {
        id: id,
        name: name,
        email: email
    };

    // create a new user based on the info and save it to the database
    const updatedUser = await User.update(userInfo, {
        where: {
            id: id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if user was successfully updated
    if (updatedUser) {
        User.findAll().then((users) => {
            res.send(users);
        }).catch((err) => {
            throw err;
        }) // return all users to browser to check that the user was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a user (DELETE)
const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.send("User successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

// send the user an email to reset their password
const sendEmail = ({ email, otp }) => {
    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD
            }
        });

        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: "Purple Page Password Recovery",
            html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
            <meta charset="UTF-8">
            <title>OTP Email Template</title>
            
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Purple Page</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for using Purple Page. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Best regards,<br />Uniting</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Uniting Vic.Tas</p>
                </div>
            </div>
            </div>
            <!-- partial -->
            
            </body>
            </html>`
        };

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent succesfuly" });
        });
    })
}

// reset a user's password
const resetPassword = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userInfo = {
            email: req.body.email,
            password: hashedPassword
        }

        // create a new user based on the info and save it to the database
        const updatedUser = await User.update(userInfo, {
            where: {
                email: req.body.email
            }
        }).catch((err) => {
            if (err) {
                throw err;
            }
        });

         // if user was successfully updated
        if (updatedUser) {
            User.findAll().then((users) => {
                res.send(users);
            }).catch((err) => {
                throw err;
            }) // return all users to browser to check that the user was updated
        } else {
            return res.send("Database update failed");
        }
    } catch {
        return res.send([]);
    }
}

module.exports = {
    registerUser, getUserByEmail, getUserById, getUser, viewUserById, getAllUsers, checkAuthenticated, checkNotAuthenticated, logoutUser, editUser, deleteUser, sendEmail, resetPassword
}