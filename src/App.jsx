import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/index.jsx";
import Sign from "./components/Sign";
import VerifySign from "./components/VerifySign/index.jsx";
import ToggleAction from "./components/ToggleAction/index.jsx";
import { useAccount, useReconnect } from "wagmi";
import { modal, useWalletInfo } from "@reown/appkit/react";
import { config } from "./components/WalletConnector/config.js";
import { injected } from "@wagmi/core";

function App() {
  const [isSign, setIsSign] = useState(true);
  const { reconnect } = useReconnect();
  const account = useAccount();
  console.log("acc:", account);
  const what = modal.getAddress();
  console.log("add:", what);

  const { walletInfo } = useWalletInfo();

  console.log(walletInfo?.name, walletInfo?.icon);

  useEffect(() => {
    const temp = reconnect(config, { connectors: [injected()] });
    console.log("temp:", temp);
  }, []);

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
