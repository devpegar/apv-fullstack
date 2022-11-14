import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEyeSlash);

  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu nuevo password",
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);
  const showHidenIcon = () => {
    if (type === "password") {
      setIcon(FaEye);
      setType("text");
    } else {
      setIcon(FaEyeSlash);
      setType("password");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setAlerta({
        msg: "El password debe tener como mínimo 8 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);
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
          Reestablece tu password y recupera el acceso a{" "}
          <span className="text-black">tus pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold my-2">
                  Nuevo Password
                </label>
                <div className="flex justify-between items-center bg-gray-200 p-2 rounded-xl">
                  <input
                    type={type}
                    placeholder="Tu nuevo password"
                    className="bg-gray-200 w-11/12 p-2 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="text-xl m-2 w-1/12 flex justify-center items-center"
                    onClick={showHidenIcon}
                  >
                    {icon}
                  </span>
                </div>
              </div>
              <input
                type="submit"
                value="Guardar nuevo password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
          </>
        )}
        {passwordModificado && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
