import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Instrucciones() {
  const { test, type } = useParams();
  console.log(test, type);
  return (
    <div className="h-screen flex flex-col justify-center">
      <h1 className="text-xl mb-5">Instrucciones:</h1>
      <p className="text-xl mb-5">
        A continuación se van a presentar 4 opciones entre palabras, audios o
        imágenes, una se va a presentar al centro en la parte superior y las
        otras tres de ellas en la parte inferior. Selecciona una de las tres
        opciones de la parte inferior que se asemeje a la que se te muestra en
        la parte de arriba.
      </p>
      <p className="text-xl mb-5">Suerte!</p>
      <Link to={`/${test}${type ? "/" + type : ""}`}>
        <button className="btn bg-blue-500 py-2 px-3 rounded text-white hover:bg-blue-700 text-xl">
          Comenzar!
        </button>
      </Link>
    </div>
  );
}

export default Instrucciones;
