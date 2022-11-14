import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
    subject: "Reestablece tu password",
    text: "Reestablece tu password",
    html: `<p>Hola ${nombre}, has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:<br>
            <a style="text-aling:center" href="${process.env.FRONTEND_URL}/olvide-password/${token}">REESTABLECER PASSWORD</a></p>
            <p>Si tu no has pedido el reestablecimiento de tu password, puedes ignorar este mensaje</p>
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
