const nodemailer = require('nodemailer');


const sendEmail = async options=>{

    const transport = {
        service:'gmail',
        auth:{
            user:'csecitlib@gmail.com',
            pass:'hxsjcezwikwxsttl'
        },
        from:'csecitlib@gmail.com'   
    };

   
    const transporter = nodemailer.createTransport(transport);

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(message);

}

module.exports = sendEmail;




// const transport = {
//     host:'smtp.ethereal.email',
//     port:587,
//     auth:{
//         user:'marvin7@ethereal.email',
//         pass:'vU7918DYGm8SYdF4uG'
//     },
//     from:'marvin7@ethereal.email'   
// };
