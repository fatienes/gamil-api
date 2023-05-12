var mysql =require("mysql");
var connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"deneme_database"
});
connect.connect(function(err){
    if(err) throw err;
    connect.query("SELECT * FROM email",function(err,sonuc){
       if(err){
        console.log(err);

       }else{
        var data=JSON.parse(JSON.stringify(sonuc))
        console.log(data)
       }
    });
});
const nodemailer = require('nodemailer')
const { google } = require('googleapis')


const CLİENT_ID = '261109595670-lrftea2rjq5rqvus4p74atpgiqc9a3id.apps.googleusercontent.com'
const CLİENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04-xHxRRs1EdmCgYIARAAGAQSNwF-L9IrYJ39GscrrN5DedE33YwBqzr05RMcmcW0fuEn-jUbzJtVBMwROMgyv60w0DMr0o0qvp0'
const ACCESSTOKEN ='ya29.a0AeTM1ifY8I1B7d_-XB_PPMYmv3TDtuzm66khLgcNg5cF5pxjmzcz_NKqsm3g9w4Vsa4GuQTZQMcthOkMbYhVajLoDAUltD5dA4JaD5z4a8PWIwPQqqsydaLFv2k6p59QkBTGEs_hOHwZ3nRZS593tgSHZd8xaCgYKAeoSARASFQHWtWOm5Tck0XzY7rxm9cW0eprQ_A0163'

const OAuth2Client = new google.auth.OAuth2(CLİENT_ID , CLİENT_SECRET , REDIRECT_URI ,ACCESSTOKEN)
OAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendmail(){
    try {
        const accessToken = await OAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'fatihenes727@gmail.com',
                clientid: CLİENT_ID,
                clientSecret: CLİENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESSTOKEN

            }
        })


        const mailOptions = {
            from: 'Fatihten sevgilerle❤<fatihenes727@gmail.com>',
            to: 'savcilifatih@gmail.com',
            subject: 'hello from gmail using API',
            text: 'hello from gmail using API',
            html: '<h1>hello from gmail using API</h1>'
            
        };
        const result = await transport.sendMail(mailOptions)
        return result







            }
            catch (error) {
                return error
            }
            
}

sendmail()
.then((result) => console.log('email sent...',result))
.catch((error) => console.log(error.message));