const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const SENDGRID_API_KEY = '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';

app.use(express.static('public'));
app.use(bodyParser.json());

sgMail.setApiKey(SENDGRID_API_KEY);

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'saurav851@gmail.com', // Replace with your recipient's email
    from: 'admin@litemyfire.co.nz', // Replace with your verified sender
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  sgMail.send(msg)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully!' });
    })
    .catch(error => {
      console.error(error.toString());
      res.status(500).json({ message: 'Failed to send email.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
