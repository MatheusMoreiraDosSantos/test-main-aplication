import { useState } from "react";
import "./styles.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function InputEmail() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleOnBlur = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }
    setEmailError("");
  };

  const renderEmailError = () => {
    if (emailError) return <span className="error-email">{emailError}</span>;
    return <></>;
  };

  return (
    <div className="container-input-email">
      <input
        type="email"
        placeholder="E-mail"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleOnBlur}
      />
      {renderEmailError()}
    </div>
  );
}

export default InputEmail;
