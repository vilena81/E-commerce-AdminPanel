const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const nodemailer = require("nodemailer")


function send_mail(data, message){
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
        to: 'shadyanvilena@gmail.com',
        subject: "Sending Email using Node.js",
        text: message,
        html: `
           <h3>First name: ${data.firstName}</h3>
           <h3>Last Name: ${data.lastName}</h3>
           <h3>Email: ${data.email}</h3>
           <p>Message: ${data.message}</p>
         `, 
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ` + info.response)
        }
    })
}

exports.createMail = async (req, res) => {
    const { firstName, lastName, email, message} = req.body;
    console.log(req.body)
        try {
            send_mail( {firstName, lastName, email, message}, message)
        res.send("OK")
        } catch (err) {
            res.status(500).json({ message:err.message });
        }
    }

    
