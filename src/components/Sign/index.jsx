import { useState } from "react";
import { signMessage, getAccount } from "@wagmi/core";
import { config } from "../WalletConnector/config";
import { getChainId } from "@wagmi/core";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";

import "./styles.css";

const getTemplateTxt = () => {
  const MSG_TO_SIGN =
    "Hi there from inBytes.xyz! \n\nSign this message to prove you have access to this wallet\n\n";

  let d = new Date();
  const offset = d.getTimezoneOffset();
  d = new Date(d.getTime() - offset * 60 * 1000);
  const dataDates = d.toISOString().split("T");

  const currentDate =
    dataDates[0] + " - " + dataDates[1].substring(0, dataDates[1].length - 5);

  const randomShit = "\n\n" + uuidv4();

  return MSG_TO_SIGN + currentDate + randomShit;
};

const unsecuredCopyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
};

/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
const copyToClipboard = (content) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(content);
  } else {
    unsecuredCopyToClipboard(content);
  }
};

function Sign() {
  const [content, setContent] = useState("");
  const [signature, setSignature] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [showQr, setShowQr] = useState(false);
  const chainId = getChainId(config);
  const { connector, address } = getAccount(config);

  return showQr ? (
    <div className="sign-component">
      <div
        style={{
          maxWidth: "300px",
          maxHeight: "600px",
          color: "black",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <img
          src={qrUrl}
          width={290}
          alt="QR code"
          style={{ borderRadius: "15px" }}
        ></img>
        <span
          onClick={() => setShowQr(false)}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          Close QR code
        </span>
      </div>
    </div>
  ) : (
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
          maxLength={250}
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

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
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
          <div
            className="sign-qrbutton"
            onClick={() => {
              let fullObj = {};
              fullObj.addr = address;
              fullObj.msg = content;
              fullObj.signature = signature;
              QRCode.toDataURL(JSON.stringify(fullObj, null, 2), {
                errorCorrectionLevel: "M",
              })
                .then((url) => {
                  setQrUrl(url);
                  setShowQr(true);
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <img
              src="./icons/qrCodeIcon.svg"
              width="35"
              height="35"
              alt="QR Logo"
              style={{ cursor: "pointer", color: "white" }}
            />
          </div>
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
      {signature && (
        <div
          style={{
            color: "black",
            fontSize: "12px",
            position: "absolute",
            bottom: "8px",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              copyToClipboard(
                JSON.stringify(
                  {
                    addr: address,
                    msg: content,
                    signature: signature,
                  },
                  null,
                  2
                )
              )
            }
          >
            Copy to clipboard
          </span>
        </div>
      )}
    </div>
  );
}

export default Sign;
