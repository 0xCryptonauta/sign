import { useEffect, useState } from "react";
import { verifyMessage } from "@wagmi/core";
import { config } from "../WalletConnector/config";

import "./styles.css";
import QRScanner from "../QRScanner";

const qrTemplate = {
  addr: "0x...",
  msg: "some content",
  signature: "0x...",
};
function verifyMsg(message) {
  try {
    const data = JSON.parse(message);
    return data.addr && data.msg && data.signature;
  } catch (error) {
    return false;
  }
}

function VerifySign() {
  const [addr, setAddr] = useState("");
  const [msg, setMsg] = useState("");
  const [signature, setSignature] = useState("");
  const [isSignValid, setIsSignValid] = useState(false);
  const [qrData, setQrData] = useState("");
  const [isFillQrData, setIsFillQrData] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState("{}");

  useEffect(() => {
    if (scannedData != "{}") {
      const jsonQrData = verifyMsg(scannedData)
        ? JSON.parse(scannedData)
        : {
            addr: "QR NOT VALID",
            msg: "QR NOT VALID",
            signature: "SIGNATURE NOT VALID",
          };

      setAddr(jsonQrData.addr);
      setMsg(jsonQrData.msg);
      setSignature(jsonQrData.signature);
    }
  }, [scannedData]);

  return (
    <div className="sign-component">
      <div className="sign-title">
        <span>Verify Signature</span>
      </div>
      {isScannerOpen && (
        <div>
          <QRScanner
            isScannerOpen={isScannerOpen}
            setIsScannerOpen={setIsScannerOpen}
            setScannedData={setScannedData}
          />
        </div>
      )}
      {isFillQrData && !isScannerOpen && (
        <div>
          <div>
            <div className="sign-template-fill" style={{ padding: "0px 15px" }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsFillQrData(false);
                  setAddr("");
                  setMsg("");
                  setSignature("");
                }}
              >
                Fill data
              </span>
            </div>
            <textarea
              className="sign-result"
              style={{ height: "400px", marginTop: "0px" }}
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              autoCorrect="false"
              autoComplete="false"
              placeholder="Paste the data obtained from the QR code scanned"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              try {
                const jsonQR = JSON.parse(qrData);
                setAddr(jsonQR["addr"]);
                setMsg(jsonQR["msg"]);
                setSignature(jsonQR["signature"]);
                setIsFillQrData(false);
              } catch (e) {
                console.log("Error validating QR data");
                setQrData(
                  "Data given is incomplete or not correct, it need to follow this structure\n\n" +
                    JSON.stringify(qrTemplate, null, 2)
                );
              }
            }}
          >
            Validate
          </button>
        </div>
      )}
      {!isScannerOpen && !isFillQrData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <div className="sign-template-fill" style={{ padding: "0px 15px" }}>
              {"BarcodeDetector" in window && (
                <span
                  onClick={() => setIsScannerOpen(true)}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  📸
                </span>
              )}

              <span
                style={{ cursor: "pointer" }}
                onClick={() => setIsFillQrData(true)}
              >
                Fill with QR data
              </span>
            </div>

            <textarea
              className="sign-result"
              style={{ height: "50px", marginTop: "0px" }}
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              autoCorrect="false"
              autoComplete="false"
              placeholder="Type evm address (0x...)"
            />
          </div>

          <textarea
            className="sign-result"
            style={{ height: "150px" }}
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message"
          />
          <textarea
            style={{ height: "100px" }}
            type="text"
            className={`sign-result ${
              showResult
                ? isSignValid
                  ? "valid-signature"
                  : "invalid-signature"
                : ""
            }`}
            value={signature}
            onChange={(e) => {
              if (showResult) setShowResult(false);
              setSignature(e.target.value);
            }}
            placeholder="Signature"
          />

          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              const isSigned = await verifyMessage(config, {
                address: addr,
                message: msg,
                signature: signature,
              });
              setIsSignValid(isSigned);
              setShowResult(true);
              console.log("verify:", isSigned);
              isSigned
                ? alert("The signature is: VALID")
                : alert("The signature is: INVALID");
            }}
          >
            Verify
          </button>
          {/* {showResult && (
            <span
              style={{
                marginTop: "15px",
                color: isSignValid ? "green" : "red",
              }}
            >
              {isSignValid ? "Sign checks" : "sign is not valid"}
            </span>
          )} */}
        </div>
      )}
    </div>
  );
}

export default VerifySign;
