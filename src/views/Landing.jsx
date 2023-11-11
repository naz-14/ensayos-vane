import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  localStorage.removeItem("totalTime", "results");
  return (
    <div className="h-screen flex flex-col justify-center align-center">
      <div>
        <h1 className="text-xl mb-5">
          Bienvenido al test por favor espera indicaciones
        </h1>
      </div>
      <div className="flex justify-around">
        <div className="basis-1/3">
          <Link to={"/instrucciones/familiarizacion"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Familiarizacion
            </button>
          </Link>
        </div>
        <div className="basis-1/3">
          <Link to={"/entrenamiento"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Entrenamiento
            </button>
          </Link>
        </div>
        <div className="basis-1/3">
          <Link to={"/prueba"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Prueba
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
