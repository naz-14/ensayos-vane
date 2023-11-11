import React from "react";
import { Link } from "react-router-dom";

function Entrenamiento() {
  return (
    <>
      <div>
        <h1>Selecciona alguna de las pruebas</h1>
      </div>
      <div className="flex justify-between ">
        <Link to="frutas">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Frutas
          </button>
        </Link>
        <Link to="colores">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Colores
          </button>
        </Link>
      </div>
    </>
  );
}

export default Entrenamiento;
