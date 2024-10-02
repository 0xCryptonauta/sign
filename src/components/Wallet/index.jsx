import {
  getConnectors,
  disconnect,
  reconnect,
  getAccount,
  connect,
  getConnections,
} from "@wagmi/core";

import { config } from "../WalletConnector/config";
import { useEffect, useState } from "react";
import { walletConnect, injected } from "@wagmi/connectors";

function shortenAddress(address) {
  return `${address?.substring(0, 6)}...${address?.substring(
    address?.length - 4
  )}`;
}

const reconnectWallet = async () => {
  const recWallets = await reconnect(config, {
    connectors: [
      injected({
        shimDisconnect: true,
      }),
      walletConnect({
        projectId: "ebd0ab86ed45dcd28ff826b06b19eea1",
      }),
    ],
  });
  console.log("reconnected wallet:", recWallets);

  if (recWallets.length > 0) {
    return {
      currentAddr: recWallets[0].accounts[0],
      walletId: recWallets[0].connector.id,
    };
  }
};

export const Wallet = () => {
  //const { userAddr, walletId } = useSelector((state) => state.user);
  const [account, setAccount] = useState("");
  const [currentAddr, setCurrentAddr] = useState("");

  const connections = getConnections(config);
  console.log("connections:", connections);

  const connectors = getConnectors(config);
  const currentWalletId = account?.connector?.id;

  const currentConnector = connectors?.find(
    (conn) => conn.id === currentWalletId
  );

  const filteredConnectors = connectors?.filter(
    (conn) => conn.id !== "injected" && conn.id !== "walletConnect"
  );

  console.log("filtered", filteredConnectors);
  console.log("Current conn:", currentConnector);

  const connectWalletConnect = async () => {
    const currentUser = await connect(config, {
      connector: walletConnect({
        projectId: "ebd0ab86ed45dcd28ff826b06b19eea1",
      }),
    });
    console.log("Wallet result: ", currentUser);
    setCurrentAddr(currentUser.accounts[0]);
  };

  useEffect(() => {
    const reconnectW = async () => {
      const walletInfo = await reconnectWallet();
      console.log("walletInfo", walletInfo);
      setAccount(getAccount(config));
      setCurrentAddr(walletInfo?.currentAddr);
    };
    reconnectW();
  }, []);

  console.log("ACC:", account);
  return currentAddr ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        //border: "1px solid white",
        width: "fit-content",
        padding: "3px",
        borderRadius: "7px",
        margin: "5px",
        color: "white",
      }}
    >
      <span>{shortenAddress(currentAddr)}</span>
      <img
        src={connections[0]?.connector?.icon || "./icons/WalletConnectIcon.svg"}
        width={25}
        height={25}
        style={{ marginLeft: "5px" }}
      ></img>
      <span
        style={{ marginLeft: "5px", cursor: "pointer" }}
        onClick={async () => {
          disconnect(config, {
            connector: connections[0].connector,
          });
          setCurrentAddr("");
        }}
      >
        ❌
      </span>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        //border: "1px solid white",
        width: "fit-content",

        padding: "3px",
        borderRadius: "7px",
        margin: "5px",
      }}
    >
      {filteredConnectors.length > 0 ? (
        <>
          {filteredConnectors?.map((connector, i) => (
            <div
              key={i}
              style={{
                margin: "3px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={async () => {
                /* onst currentUser = await connector.connect();
              console.log("result:", currentUser.accounts[0]);
              setAccount(currentUser.accounts[0]); */

                const currentUser = await connect(config, {
                  connector: { ...connector, shimDisconnect: false },
                });

                console.log("res2:", currentUser);
                setCurrentAddr(currentUser.accounts[0]);
              }}
            >
              <img src={connector?.icon} height={25} width={25} />
            </div>
          ))}
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <img
              src="./icons/WalletConnectIcon.svg"
              width="30"
              height="30"
              alt="Metamask Logo"
              onClick={() => connectWalletConnect()}
              style={{ cursor: "pointer" }}
            />
          </div>
        </>
      ) : (
        <div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <img
              src="./icons/WalletConnectIcon.svg"
              width="30"
              height="30"
              alt="Metamask Logo"
              onClick={() => connectWalletConnect()}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
