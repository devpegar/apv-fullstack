import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, nombre, token } = datos;

  const info = await transporter.sendMail({
    from: "APV -Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Confirma tu cuenta de APV",
    text: "Confirma tu cuenta de APV",
    html: `<p>Hola ${nombre}, confirma tu cuenta en APV</p>
            <p>Tu cuenta ya fue creada, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">CONFIRMAR CUENTA</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
