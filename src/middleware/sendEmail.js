import sgMail from "@sendgrid/mail";
import { config } from "../utils/url.js";
const { SENDGRID_API_KEY, SMTP_USER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const returnHtml = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .main {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          font-family: sans-serif;
          color: #000;
     
        }
  
        .container {
          max-width: 600px;
          width: 100%;
          padding: 0 30px;
        }
        .button {
          padding: 15px 25px;
          background-color: #fa621c;
          border: 1px solid #fa621c;
          border-radius: 15px;
          font-size: 15px;
          color: #fff;
          width:fit-content;
        }
        a:link {
          color: #fff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
        }
        h1 {
          text-align: center;
        }
        .firstParagraph {
          margin-top: 150px;
          margin-bottom: 30px;
          font-size: 20px;
        }
        .secondParagraph {
          margin-top: 15px;
          font-size: 15px;
        }
      </style>
    </head>
    <body>
      <div class="main">
        <div class="container">
          <h1>Confirm Your Email</h1>
          <p class="firstParagraph">Use this OTP for Login Verification </p>
          <div class="button">${otp}</div>
          <p class="secondParagraph">
            If you received this email by mistake, simply delete it. You won't be
            subscribed if you don't click the confirmation link above.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
};

// ============================== send Verification Mail For SignUp========================
export const sendVerificationMailForSignUp = async (toMail, otp) => {
  // const verifyUrl = `${
  //   config[process.env.NODE_ENV].server
  // }/api/auth/verify-signup-email?token=${token}`;

  const msg = {
    to: toMail,
    from: { name: "socialApp", email: SMTP_USER },
    subject: "Verify Your Email Address",
    text: "Please Click The Below Link To Verify Your Email Address",
    html: returnHtml(otp),
  };

  await sgMail.send(msg);
};

// ============================== Send Opt in MAil For ResetPassword========================
export const sendOptMailForResetPass = async (toMail, otp) => {
  const msg = {
    to: toMail,
    from: { name: "socialApp", email: SMTP_USER },
    subject: "Verify Your Email Address",
    text: "Please Click The Below Link To Verify Your Email Address",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .main {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            font-family: sans-serif;
            color: #000;
       
          }
    
          .container {
            max-width: 600px;
            width: 100%;
            padding: 0 30px;
          }
          .button {
            padding: 15px 25px;
            background-color: #fa621c;
            border: 1px solid #fa621c;
            border-radius: 15px;
            font-size: 15px;
            color: #fff;
            width:fit-content;
          }
          a:link {
            color: #fff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: none;
          }
          h1 {
            text-align: center;
          }
          .firstParagraph {
            margin-top: 150px;
            margin-bottom: 30px;
            font-size: 20px;
          }
          .secondParagraph {
            margin-top: 15px;
            font-size: 15px;
          }
        </style>
      </head>
      <body>
        <div class="main">
          <div class="container">
            <h1>Confirm Your Email</h1>
            <p class="firstParagraph">Use this OTP for Changing Password </p>
            <div class="button">${otp}</div>
            <p class="secondParagraph">
              If you received this email by mistake, simply delete it. You won't be
              subscribed if you don't click the confirmation link above.
            </p>
          </div>
        </div>
      </body>
    </html>
    `,
  };

  await sgMail.send(msg);
};