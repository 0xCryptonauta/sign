import { useState } from "react";
import { verifyMessage } from "@wagmi/core";
import { config } from "../WalletConnector";

//import "./styles.css";

function VerifySign() {
  const [addr, setAddr] = useState("");
  const [msg, setMsg] = useState("");
  const [sign, setSign] = useState("");
  const [isSignValid, setIsSignValid] = useState(false);

  return (
    <div className="sign-component">
      <div className="sign-title">
        <span>Verify Signature</span>
      </div>
      <textarea
        className="sign-result"
        style={{ height: "50px" }}
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
        autoCorrect="false"
        autoComplete="false"
        placeholder="Type evm address (0x...)"
      />

      <textarea
        style={{ height: "100px" }}
        type="text"
        className="sign-result"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Message"
      />
      <textarea
        style={{ height: "100px" }}
        type="text"
        className="sign-result"
        value={sign}
        onChange={(e) => setSign(e.target.value)}
        placeholder="Signature"
      />

      <button
        type="button"
        onClick={async () => {
          const isSigned = await verifyMessage(config, {
            address: addr,
            message: msg,
            signature: sign,
          });
          setIsSignValid(isSigned);
          console.log("verify:", isSigned);
        }}
      >
        Verify
      </button>

      <span style={{ color: isSignValid ? "green" : "red" }}>
        {isSignValid ? "Sign checks" : "sign is not valid"}
      </span>
    </div>
  );
}

export default VerifySign;
