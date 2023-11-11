import React from "react";
import { Link } from "react-router-dom";

function Finish() {
  return (
    <div>
      <div className="fixed ">
        <Link to={"/"}>
          <button className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Volver al inicio
          </button>
        </Link>
      </div>
      <div
        className="h-screen flex flex-col justify-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-xl">Muchas gracias por participar!</h1>
        <h1 className="text-xl">Por favor pide a el encargado que te asista</h1>
      </div>
    </div>
  );
}

export default Finish;
