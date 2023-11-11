import React from "react";

function Sound({ soundName }) {
  console.log(soundName);
  let audio = new Audio(`/${soundName}`);

  const start = () => {
    audio.play();
  };

  return (
    <div className="btn bg-purple-500 py-2 px-3 rounded flex align-center justify-center hover:bg-purple-700">
      <button onClick={start}>
        <div className="flex">
          <img
            src="/play-solid.svg"
            width={"20px"}
            height={"20px"}
            className="mr-2"
          />
          <p>Click aqui para escuchar</p>
        </div>
      </button>
    </div>
  );
}

export default Sound;
