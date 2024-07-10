import { useState } from "react";
import "./App.css";
import Header from "./components/Header/index.jsx";
import Sign from "./components/Sign";
import VerifySign from "./components/VerifySign/index.jsx";
import ToggleAction from "./components/ToggleAction/index.jsx";

function App() {
  const [isSign, setIsSign] = useState(true);

  return (
    <>
      <Header />
      <ToggleAction setIsSign={setIsSign} />
      <div>{isSign ? <Sign /> : <VerifySign />}</div>
    </>
  );
}

export default App;
