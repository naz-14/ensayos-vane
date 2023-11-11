import React from "react";
import { useLocation } from "react-router-dom";
import data from "../data/ensayos5revisado.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Sound from "../components/Sound";
import _ from "lodash";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

function Test({ familiarizacion = false }) {
  const location = useLocation().pathname.split("/").slice(1);
  const time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 10);
  const [formatedData, setFormatedData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [correct, setCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wrongAnswersCounter, setWrongAnswersCounter] = useState(0);
  const [generalError, setGeneralError] = useState(0);
  const [next, setNext] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { totalSeconds, seconds, start, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => handleExpire(),
  });
  const [submited, setSubmited] = useState(false);
  useEffect(() => {
    setFormatedData(
      _.shuffle(
        familiarizacion
          ? data.ensayos[location[0]]
          : data.ensayos[location[0]][location[1]]
      )
    );
  }, []);

  useEffect(() => {
    if (formatedData.length != 0) {
      const answersData = formatedData.map((answer) => {
        console.log({ answer });
        return {
          answerId: answer.id,
          correct: answer.opciones.filter((option) => option.esCorrecto)[0]
            .archivo,
          answerSelection: null,
          seconds: 0,
        };
      });
      setAnswers(answersData);
    }
  }, [formatedData]);

  useEffect(() => {
    if (next) {
      const timer = setTimeout(() => {
        handleNext();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [next]);

  useEffect(() => {
    if (generalError > 2) {
      navigate("/finish");
    }
  }, [generalError]);

  useEffect(() => {
    if (completed) {
      localStorage.setItem("totalTime", totalTime);
    }
  }, [completed]);

  const handleSelectedOption = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
  };
  const handleAnswersData = () => {
    if (!selectedOption) {
      alert("Por favor selecciona una opcion");
      return;
    }
    pause();
    const newAnswers = answers.map((answer) => {
      if (answer.answerId === formatedData[counter].id) {
        const isCorrect = answer.correct === selectedOption;
        // if (!isCorrect) setWrongAnswersCounter(wrongAnswersCounter + 1);
        setCorrect(isCorrect);
        return {
          ...answer,
          answerSelection: selectedOption,
          seconds: 10 - seconds,
        };
      }
      return answer;
    });
    setAnswers(newAnswers);
    setSubmited(true);
    setNext(true);
  };
  const handleNext = () => {
    setNext(false);
    setTotalTime(totalTime + (10 - seconds));
    // if (wrongAnswersCounter > 2) {
    //   if (location[0] === "entrenamiento") {
    //     alert("Cometiste mas de dos errores reiniciaremos la prueba");
    //     setWrongAnswersCounter(0);
    //     restart(new Date().setSeconds(new Date().getSeconds() + 10));
    //     setCounter(0);
    //     setSelectedOption(null);
    //     setSubmited(false);
    //     setCorrect(null);
    //     setGeneralError(generalError + 1);
    //   }
    // }
    if (counter + 1 <= formatedData.length - 1) {
      restart(new Date().setSeconds(new Date().getSeconds() + 10));
      setCounter(counter + 1);
      setSelectedOption(null);
      setSubmited(false);
      setCorrect(null);
      return;
    }
    localStorage.setItem("results", JSON.stringify(answers));
    setCompleted(true);
    alert("Completaste la prueba por favor comunicalo al encargado");
  };

  const handleExpire = () => {
    const newAnswers = answers.map((answer) => {
      if (answer.answerId === formatedData[counter].id) {
        const isCorrect = answer.correct === selectedOption;
        if (!isCorrect) setWrongAnswersCounter(wrongAnswersCounter + 1);
        setCorrect(answer.correct === selectedOption);
        return {
          ...answer,
          answerSelection: selectedOption,
          seconds: 10,
        };
      }
      return answer;
    });
    setAnswers(newAnswers);
    setSubmited(true);
    setNext(true);
  };

  const handleResults = () => {
    if (location[0] != "familiarizacion") {
      navigate(`/results/${location[0]}`);
    }
    navigate(`/results/${location[0] + "/" + location[1]}`);
  };

  console.log(answers);

  return (
    <div className="h-screen flex flex-col justify-center">
      {/* <div
        style={{
          textAlign: "center",
          position: "absolute",
          top: "0",
          right: "50px",
        }}
      >
        <div style={{ fontSize: "50px" }}>
          <span>{seconds}</span>
        </div> */}
      {/* </div> */}
      <div className="flex flex-col justify-center content-center">
        <div>
          <h1 className="text-xl mb-5">
            {formatedData[counter]?.instrucciones}
          </h1>
        </div>
        <div className="flex justify-center">
          {formatedData[counter]?.estimulo === "Imagen" && (
            <img
              src={"/" + formatedData[counter]?.archivo}
              alt={formatedData[counter]?.archivo}
              style={{ width: "300px", height: "300px" }}
            />
          )}
          {formatedData[counter]?.estimulo === "Audio" && (
            <Sound soundName={formatedData[counter].archivo} />
          )}
          {formatedData[counter]?.estimulo === "Palabra" && (
            <h2 className="text-3xl font-bold">
              {formatedData[counter]?.archivo}
            </h2>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        {formatedData[counter]?.opciones.map((option, index) => {
          return (
            <div
              key={index}
              className={`flex justify-center ${
                option.esCorrecto && location[0] != "prueba"
                  ? "border-green-600"
                  : "border-red-600"
              } ${submited && location[0] != "prueba" && "border-4"}`}
              style={{ flexBasis: "33%" }}
            >
              <div className="basis-1/6 flex content-center justify-center">
                <input
                  type="radio"
                  value={option.archivo}
                  checked={selectedOption === option.archivo}
                  onChange={handleSelectedOption}
                  disabled={submited}
                  style={{ width: "30px", height: "100%" }}
                />
              </div>
              <div className="basis-5/6 flex justify-start">
                {option.estimulo === "Palabra" ? (
                  <p className="text-xl">{option.archivo}</p>
                ) : option.estimulo === "Audio" ? (
                  <Sound soundName={option.archivo} />
                ) : (
                  <img
                    style={{ maxWidth: "90%", maxHeight: "300px" }}
                    src={`/${option.archivo}`}
                  ></img>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-around">
        {location[0] === "familiarizacion" ||
        location[0] === "entrenamiento" ? (
          <button
            onClick={() => handleAnswersData()}
            disabled={submited}
            className={`${
              submited
                ? correct
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-4 px-6 mt-3 rounded text-xl`}
          >
            {submited && correct && "Muy bien!"}
            {submited && !correct && "La respuesta fue incorrecta"}
            {!submited && "Enviar respuesta"}
          </button>
        ) : (
          <button
            onClick={() => handleAnswersData()}
            disabled={submited}
            className={`${
              submited ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-4 px-6 rounded text-xl`}
          >
            {!submited && "Enviar respuesta"}
            {submited && "Enviado"}
          </button>
        )}
        {completed && (
          <button
            className="btn bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded text-white"
            onClick={() => handleResults()}
          >
            Ver resultados
          </button>
        )}
      </div>
    </div>
  );
}

export default Test;
