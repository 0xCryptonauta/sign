//import { useState } from "react";
import WalletButton from "../WalletButton";
import "./styles.css";

function Header() {
  //const [content, setContent] = useState("");

  return (
    <header className="sign-header">
      <div className="header-title">
        <span>
          <h1>Signature</h1>
        </span>{" "}
      </div>

      <div className="header-body">
        <WalletButton />
      </div>
    </header>
  );
}

export default Header;
