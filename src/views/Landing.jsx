import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  localStorage.removeItem("totalTime", "results");
  return (
    <>
      <div>
        <h1 className="text-xl mb-5">
          Bienvenido al test por favor espera indicaciones
        </h1>
      </div>
      <div className="flex justify-around">
        <Link to={"/familiarizacion"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Familiarizacion
          </button>
        </Link>
        <Link to={"/entrenamiento"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Entrenamiento
          </button>
        </Link>
        <Link to={"/prueba"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Prueba
          </button>
        </Link>
      </div>
    </>
  );
}

export default Landing;
