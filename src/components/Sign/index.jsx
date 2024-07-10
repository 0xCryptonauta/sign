import { useState } from "react";
import { signMessage, getAccount } from "@wagmi/core";
import { config } from "../WalletConnector";
import { getChainId } from "@wagmi/core";

import "./styles.css";

function Sign() {
  const [content, setContent] = useState("");
  const [sign, setSign] = useState("");
  const chainId = getChainId(config);
  const { connector } = getAccount(config);

  return (
    <div className="sign-component">
      <div className="sign-title">
        <span>Wallet signing</span>
      </div>
      <textarea
        type=""
        className="sign-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoCorrect="false"
        autoComplete="false"
        placeholder="Type any message"
      />

      <button
        type="button"
        onClick={async () => {
          const signedTxt = await signMessage(config, {
            connector,
            chainId: chainId,
            message: content,
          });
          setSign(signedTxt);
        }}
      >
        Sign
      </button>

      <textarea
        style={{ height: "100px" }}
        type="text"
        className="sign-result"
        value={sign}
        placeholder="Waiting for your signature"
        readOnly
      />
    </div>
  );
}

export default Sign;
