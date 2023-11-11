import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function OpcionesEntrenamiento() {
  const location = useLocation().pathname;
  return (
    <div className="h-screen flex flex-col justify-center">
      <div>
        <h1 className="text-xl mb-5">Selecciona alguna de las pruebas</h1>
      </div>
      <div className="flex justify-around ">
        <Link to={`/instrucciones/entrenamiento/AB`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl">
            AB
          </button>
        </Link>
        <Link to={`/instrucciones/entrenamiento/BC`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl">
            BC
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OpcionesEntrenamiento;
