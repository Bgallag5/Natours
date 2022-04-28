const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.firstName = user.name.split(" ")[0];
    this.from = `Ben Gallagher <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //Sendgrid
      return "PROD";
    }
    //create transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //send the actual email
  async sendEmail(template, subject) {
    //1 - render email HTML (as a string)
    const html = createEmailMarkup(this.firstName, this.from);
    //2 Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };
    //3 await create transport, then send email with our options
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.sendEmail("Welcome", "Welcome to Natours!");
  }
};

const createEmailMarkup = (firstName, from) => {
  return `
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <h4>Hello ${firstName}!</h4>
        <p>Welcome to Natours 🎉🎈</p>
        <p>
          You're all signed up and ready to go. Go back to the <a target="__blank" rel="noreferrer" href="www.google.com"> Tour Page</a> to
          browse or book tours.
        </p>
        <p>
          If you need help or have any questions please reach out to our amazing
          staff. You can find them on our Contact Page.
        </p>
        <p>- Ben Gallagher, Owner</p>
        <p>${from}</p>
      </div>
 `;
};
