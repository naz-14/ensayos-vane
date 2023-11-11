import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import OpcionesEntrenamiento from "./views/OpcionesEntrenamiento";
import Test from "./views/Test";
import OpcionesPrueba from "./views/OpcionesPrueba";
import Results from "./views/Results";
import Finish from "./views/Finish";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
            path="familiarizacion"
            element={<Test familiarizacion="true" />}
          />
          <Route path="entrenamiento">
            <Route index element={<OpcionesEntrenamiento />} />
            <Route path=":type" element={<Test />} />
          </Route>
          <Route path="prueba">
            <Route index element={<OpcionesPrueba />} />
            <Route path=":type" element={<Test />} />
          </Route>
          <Route path="results/:test/:type?" element={<Results />}></Route>
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
