import { Router } from "express";
// import recaptcha from "../controller/recaptcha/recaptchaHandler";
import svgCaptcha from "svg-captcha";
import axios from "axios";
export const recaptchaRoutes = Router();

async function verifyRecaptcha(responseToken) {
  const secretKey = "6LdT5c8mAAAAADelLYUTHtM6odmzMRrw3rLZsMhe";

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: responseToken,
        },
      }
    );

    const { success, score, action, challenge_ts } = response.data;

    if (success) {
      // reCAPTCHA verification successful
      return true;
    } else {
      // reCAPTCHA verification failed
      return false;
    }
  } catch (error) {
    // Error occurred during reCAPTCHA verification
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}



recaptchaRoutes.post("/verifyRecaptcha", async (req, res) => {
  const { recaptchaToken, otherFormData } = req.body;

  // Verify reCAPTCHA
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);

  if (isRecaptchaValid) {
    // reCAPTCHA verification successful
    // Process other form data
    // ...
    res.json({ success: true });
    // res.send("handle recaptcha");
  } else {
    // reCAPTCHA verification failed
    res.json({ success: false, error: "reCAPTCHA verification failed" });
  }

  // const captcha = svgCaptcha.create();
  // console.log("recaptcha", captcha);
});
