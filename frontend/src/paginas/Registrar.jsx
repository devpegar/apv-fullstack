import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function Registrar() {
  // Controla lo que ingresa el usuario en el formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  // Control sobre las alertas
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica que los inputs del formulario no esten vacios
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }
    // Verifica si las contraseñas coinciden
    if (password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no son iguales", error: true });
      return;
    }
    // Controla que la contraseña no sea menor a 8 caracteres
    if (password.length < 8) {
      setAlerta({
        msg: "El password debe tener como minimo 8 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});

    // Crear el usuario en la api
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password });
      setAlerta({
        msg: "Usuario creado correctamente, revisa tu email para confirmar tu cuenta",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black lg:text-6xl md:text-5xl sm:text-4xl text-center">
          Crea tu cuenta y Administra{" "}
          <span className="text-black">tus pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repite tu Password
            </label>
            <input
              type="password"
              placeholder="Ingresa nuevamente tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Registrar;
