const fs = require("fs");
require("dotenv-extended").config();
const readline = require("readline");
const nodemailer = require("nodemailer");
var ejs = require("ejs");

const mailBulk = () => {
    // console.log("HII");
    var config = {
        sender_email: process.env.SENDER_EMAIL,
        sender_pass: process.env.SENDER_PASSWORD,
        port: process.env.PORT,
        host: process.env.HOST,
      };
    //   console.log(config);
    
    const stream = fs.createReadStream("./csvdemo.csv");
    const rl = readline.createInterface({ input: stream });
    let count=0;
    rl.on("line", (row) => {
        if(count){
            console.log(row.split(',').at(1));
            const receiver_id=row.split(',').at(1);
            ejs.renderFile(__dirname + "/test.ejs", { reciever:receiver_id }, function (err, data) {
                if (err) {
                  // console.log(err);
                  return false;
                } else {
                  try {
                    var mainOptions = {
                      from: "rahul@turnkeytech.in",
                      to: receiver_id,
                      subject: "Hii",
                    //   html: data
                    text: "HII i"
                    };
                    // console.log("html data ======================>", mainOptions.html);
                    // console.log(mainOptions);
                    nodemailer.createTransport({
                      host:"smtp.sendgrid.net",
                      auth: {
                        user: 'apikey',
                        pass: "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"
                      },
                      port: 587,
                    }).sendMail(mainOptions, (err) => {
                      if (err) {
                        console.log("mail not sent 1");
                      }
                      else {
                        console.log("mail sent ");
                      }
                    })
                   
                  } catch (error) {
                    console.log("mail not sent");
                  }
            
                }});
        }
        count++;
    });
}

mailBulk();