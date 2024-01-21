import pkg from "@sendgrid/mail";
const { setApiKey, send } = pkg;

setApiKey(process.env.sendgrid_API_KEY);

const sendWelcomeMail = (email, name) => {
  send({
    to: email,
    from: "himanshujudge9922@gmail.com",
    subject: "Welcome to the MEME API",
    html: `<html>
              <head>
              </head>
              <body>
                <h1>Welcome from the MEME API Team</h1>
                <img src="https://i.pinimg.com/474x/2d/56/ed/2d56ede38d6d13ce7b23c7a5b52a7bac.jpg" alt="">
              </body>
          </html>`,
  });
};

const sendCancellationMail = (email, name) => {
  send({
    to: email,
    from: "himanshujudge9922@gmail.com",
    subject: "We are going to miss you.",
    html: `<html>
              <head>
              </head>
              <body>
                <h1>Bye from the team Leader</h1>
                <img src="https://media.makeameme.org/created/bye-bye-w53pqx.jpg" alt="">
              </body>
          </html>`,
  });
};

export { sendWelcomeMail, sendCancellationMail };
