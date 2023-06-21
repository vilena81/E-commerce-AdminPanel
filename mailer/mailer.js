const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const nodemailer = require("nodemailer")

exports.send_mail=(mail, token) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: USER,
            pass: PASSWORD
        }, tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: USER,
        to: mail,
        subject: "Sending Email using Node.js",
        text: `Click http://localhost:8000/verified?token=${token}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ` + info.response)
        }
    })
}


