import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function OpcionesPrueba() {
  const location = useLocation().pathname;
  return (
    <div className="h-screen flex flex-col justify-center">
      <div>
        <h1 className="text-xl mb-5">Selecciona alguna de las pruebas</h1>
      </div>
      <div className="flex justify-between">
        <Link to={`/instrucciones/prueba/BA`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            BA
          </button>
        </Link>
        <Link to={`/instrucciones/prueba/CB`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            CB
          </button>
        </Link>
        <Link to={`/instrucciones/prueba/AC`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            AC
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OpcionesPrueba;
