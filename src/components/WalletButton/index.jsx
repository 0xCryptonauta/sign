//import { useState } from "react";
//import { connect, reconnect } from "@wagmi/core";
//import { injected, walletConnect } from "@wagmi/connectors";
//import { config } from "../WalletConnector/config";
//import { getAccount } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

/* function truncateString(txt) {
  return txt?.substring(0, 7) + "..." + txt?.substring(txt.length - 5);
} */

function WalletButton() {
  const [account, setAccount] = useState("");
  const account2 = useAccount();

  /* const connectWallet = async () => {
    const result = await connect(config, { connector: injected() });
    console.log("Wallet result: ", result);
    setAccount(getAccount(config));
  }; */

  /* const connectWalletConnect = async () => {
    const result = await connect(config, {
      connector: walletConnect({
        projectId: "ebd0ab86ed45dcd28ff826b06b19eea1",
      }),
    });
    console.log("Wallet result: ", result);
    setAccount(getAccount(config));
  }; */

  useEffect(() => {
    if (account2) setAccount(account2);
  }, []);

  return (
    <>
      {/* {account && (
        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <span>{truncateString(account.address)}</span>
        </div>
      )} */}

      {/*  <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <img
          src="./icons/MetamaskIcon.svg"
          width="30"
          height="30"
          alt="Metamask Logo"
          onClick={() => connectWallet()}
          style={{ cursor: "pointer" }}
        />
      </div> */}

      <w3m-button size="md" balance="hide" style={{ marginRight: "15px" }} />

      <w3m-network-button size="md" style={{ marginRight: "15px" }} />
      {/* <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <img
          src="./icons/WalletConnectIcon.svg"
          width="30"
          height="30"
          alt="Metamask Logo"
          onClick={() => connectWalletConnect()}
          style={{ cursor: "pointer" }}
        />
      </div> */}

      {/* <button onClick={() => connectWallet()}>Wallet</button> */}
      {/* <button onClick={() => connectWalletConnect()}>W.C.</button> */}
    </>
  );
}

export default WalletButton;
