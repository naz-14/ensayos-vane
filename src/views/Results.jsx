import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Results() {
  const { test, type } = useParams();
  const answers = JSON.parse(localStorage.getItem("results"));
  const totalTime = localStorage.getItem("totalTime");
  const handleResetAnswers = () => {
    localStorage.removeItem("results");
    localStorage.removeItem("totalTime");
  };
  useEffect(() => {
    const correctAnswers = answers.filter(
      (answer) => answer.correct === answer.answerSelection
    );
    const totalAnswers = answers.length;
    setPercentage((correctAnswers.length * 100) / totalAnswers);
  }, []);
  const [percentage, setPercentage] = useState(null);

  return (
    <div>
      <div className="fixed ">
        <Link to={"/"}>
          <button
            className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleResetAnswers}
          >
            Volver al inicio
          </button>
        </Link>
      </div>
      <h1 className="text-xl">{`Resultados de ${test} ${
        typeof type === undefined ? "tipo " + type : "-"
      }`}</h1>
      <h1 className="text-xl">{`Tiempo de resolucion: ${totalTime}`}</h1>
      <h1 className="text-xl">{`Porcentaje correcto: ${percentage}%`}</h1>
      <div className="flex align-center justify-center mt-5">
        <table>
          <thead>
            <tr className="border border-black">
              <th className="border border-black p-3">Numero</th>
              <th className="border border-black p-3">Respuesta correcta</th>
              <th className="border border-black p-3">Respuesta del usuario</th>
              <th className="border border-black p-3">Tiempo</th>
              <th className="border border-black p-3">Correcto?</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => {
              return (
                <tr
                  className={
                    answer.correct === answer.answerSelection
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }
                >
                  <td className="p-5">{answer.answerId}</td>
                  <td>{answer.correct}</td>
                  <td>{answer.answerSelection}</td>
                  <td>{answer.seconds}</td>
                  <td>
                    {answer.correct === answer.answerSelection ? "Si" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results;
