//NOTE: This send email function currently only sends emails to the Mailtrap sandbox for testing. You would need to purchase a domain to send real emails

const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

const welcome = require("../views/email/welcome.pug");
const passwordReset = require("../views/email/passwordReset.pug");
const welcome = require("../views/email/welcome.pug");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `OS Store`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject,
    // });
    const html = pug.renderFile(template, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(welcome, "Welcome to the The App Family!");
  }

  // async sendPasswordReset() {
  //   await this.send(
  //     "passwordReset",
  //     "Your password reset token (valid for only 10 minutes)"
  //   );
  // }

  async sendPasswordReset() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.send(
          passwordReset,
          "Your password reset token (valid for only 10 minutes)"
        );
        resolve("Password reset email sent successfully.");
      } catch (error) {
        reject(
          new Error(`Failed to send password reset email: ${error.message}`)
        );
      }
    });
  }
};
