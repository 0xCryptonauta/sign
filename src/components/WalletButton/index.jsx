//import { useState } from "react";
import { connect } from "@wagmi/core";
import { injected, walletConnect } from "@wagmi/connectors";
import { config } from "../WalletConnector";
import { getAccount } from "@wagmi/core";
import { useState } from "react";

function truncateString(txt) {
  return txt?.substring(0, 7) + "..." + txt?.substring(txt.length - 5);
}

function WalletButton() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    const result = await connect(config, { connector: injected() });
    console.log("Wallet result: ", result);
    setAccount(getAccount(config));
  };

  const connectWalletConnect = async () => {
    const result = await connect(config, {
      connector: walletConnect({
        projectId: "bb1dfdf56d35ce419d54a9fe40df3ae0",
      }),
    });
    console.log("Wallet result: ", result);
    setAccount(getAccount(config));
  };

  return (
    <>
      {account && (
        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <span>{truncateString(account.address)}</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <img
          src="./icons/MetamaskIcon.svg"
          width="30"
          height="30"
          alt="Metamask Logo"
          onClick={() => connectWallet()}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <img
          src="./icons/WalletConnectIcon.svg"
          width="30"
          height="30"
          alt="Metamask Logo"
          onClick={() => connectWalletConnect()}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* <button onClick={() => connectWallet()}>Wallet</button> */}
      {/* <button onClick={() => connectWalletConnect()}>W.C.</button> */}
    </>
  );
}

export default WalletButton;
