import * as nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:25,
    secure: false, 
    auth: {
      user: "hieu78544@gmail.com",
      pass: "ltwdsbxeveigmtzh",
    },
  });
  