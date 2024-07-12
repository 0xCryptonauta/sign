import { useState } from "react";
import { signMessage, getAccount } from "@wagmi/core";
import { config } from "../WalletConnector";
import { getChainId } from "@wagmi/core";
import { v4 as uuidv4 } from "uuid";

import "./styles.css";

const getTemplateTxt = () => {
  const MSG_TO_SIGN =
    "Hi there from Signature! \n\nSign this message to prove you have access to this wallet\n\n";

  let d = new Date();
  const offset = d.getTimezoneOffset();
  d = new Date(d.getTime() - offset * 60 * 1000);
  const dataDates = d.toISOString().split("T");
  const currentDate =
    dataDates[0] + " - " + dataDates[1].substring(0, dataDates[1].length - 5);

  const randomShit = "\n\n" + uuidv4();

  return MSG_TO_SIGN + currentDate + randomShit;
};

function Sign() {
  const [content, setContent] = useState("");
  const [signature, setSignature] = useState("");
  const chainId = getChainId(config);
  const { connector, address } = getAccount(config);

  return (
    <div className="sign-component">
      <div className="sign-title">
        <span>Wallet Signing</span>
      </div>

      <div>
        <textarea
          type=""
          className="sign-content"
          value={content}
          onChange={(e) => {
            if (signature != "") setSignature("");
            setContent(e.target.value);
          }}
          autoCorrect="false"
          autoComplete="false"
          placeholder="Type any message"
        />
        <div className="sign-template-fill">
          <span
            onClick={() => {
              setContent(getTemplateTxt());
            }}
            style={{ cursor: "pointer" }}
          >
            Fill with template
          </span>
        </div>
      </div>

      <div>
        <button
          type="button"
          className="sign-button"
          onClick={async () => {
            const signedTxt = await signMessage(config, {
              connector,
              chainId: chainId,
              message: content,
            });
            setSignature(signedTxt);
          }}
        >
          Sign
        </button>
        {signature && (
          <button
            type="button"
            className="sign-qrbutton"
            onClick={() => {
              let fullObj = {};
              fullObj.addr = address;
              fullObj.msg = content;
              fullObj.signature = signature;
              console.log("json", JSON.stringify(fullObj));
            }}
          >
            Make QR
          </button>
        )}
      </div>

      <textarea
        style={{ height: "100px" }}
        type="text"
        className="sign-result"
        value={signature}
        placeholder="Waiting for your signature"
        readOnly
      />
    </div>
  );
}

export default Sign;
