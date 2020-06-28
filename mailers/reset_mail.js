const nodeMailer = require("../config/nodemailer");

exports.reset = (user) => {
    let htmlString = nodeMailer.renderTemplate({user:user}, "/user/reset_password.ejs")
    nodeMailer.transporter.sendMail({
        from: 'jabirmt7824@gmail.com',
        to: user.email,
        subject: "Reset Password",
        html: htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("errror in sending reset password mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}