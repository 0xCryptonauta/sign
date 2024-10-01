import { useState } from "react";
import "./App.css";
import Header from "./components/Header/index.jsx";
import Sign from "./components/Sign";
import VerifySign from "./components/VerifySign/index.jsx";
import ToggleAction from "./components/ToggleAction/index.jsx";
//import { useAccount, useReconnect } from "wagmi";

function App() {
  const [isSign, setIsSign] = useState(true);

  return (
    <>
      <Header />
      <div style={{ marginTop: "50px" }}>
        <ToggleAction isSign={isSign} setIsSign={setIsSign} />
        <div>{isSign ? <Sign /> : <VerifySign />}</div>
      </div>
    </>
  );
}

export default App;
