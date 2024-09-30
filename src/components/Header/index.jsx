//import { useState } from "react";
import "./styles.css";

function Header() {
  //const [content, setContent] = useState("");

  return (
    <header className="sign-header">
      <div className="header-title">
        <span>
          <h1>
            <a style={{ color: "white" }} href="https://inBytes.xyz">
              inBytes
            </a>
          </h1>
        </span>{" "}
      </div>

      <div className="header-body">
        {/* <WalletButton /> */}

        <w3m-button size="sm" balance="hide" style={{ marginRight: "15px" }} />
      </div>
    </header>
  );
}

export default Header;
