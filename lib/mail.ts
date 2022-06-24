import mailjet from 'node-mailjet';

const sendPasswordResetEmail = (email: string, token: string) => {
  mailjet.connect(process.env.MAILJET_API_KEY!, process.env.MAILJET_API_SECRET!).post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.MY_PRIVATE_EMAIL,
          Name: 'Shareed Shop',
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: 'Reset your password',
        TextPart: 'Reset your password',
        HTMLPart: `<h3>Reset your password</h3> 
      <p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password.</p>`,
        CustomID: 'AppGettingStartedTest',
      },
    ],
  }).then((result) => {
    console.log(result.body);
  })
    .catch((err) => {
      console.log(err.statusCode);
      console.log(err.response.body);
    });
};

export default sendPasswordResetEmail;
