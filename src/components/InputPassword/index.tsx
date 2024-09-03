import { useState } from "react";
import "./styles.css";

function InputPassword() {
  const [showPassWord, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="container-input-password">
      <button
        type="button"
        className="button-show-password"
        onClick={() => setShowPassword(!showPassWord)}
      >
        {showPassWord ? "Esconder senha" : "Mostrar senha"}
      </button>
      <input
        type={showPassWord ? "text" : "password"}
        placeholder="Senha"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
export default InputPassword;
