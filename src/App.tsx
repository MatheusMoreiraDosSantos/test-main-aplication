import React, { useState } from "react";
import "./App.css";
import InputEmail from "./components/InputEmail";
import InputPassword from "./components/InputPassword";
import { ThreeDots } from "react-loader-spinner";
import Header from "./components/Header";

// const RemoteApp = React.lazy(() => import("partnerApplication/App"));

const verifySessionKey = () => {
  const sessionKey =
    localStorage.getItem("sessionKey") || sessionStorage.getItem("sessionKey");
  if (sessionKey === "xxx") return true;
  return false;
};

const ForLoginSimulation = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

const transformEmail = (email: string): string => {
  const localPart = email.split("@")[0];

  const transformed = localPart.replace(/\d+/g, "").replace(/\./g, " ");

  return transformed;
};

function App() {
  const [errorRequiredInputs, setErrorRequiredInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);

  const [currentRouter, setCurrentRouter] = useState("/");

  const [isLoagged, setIsLogged] = useState(verifySessionKey());

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    if (!email || !password) {
      setErrorRequiredInputs(true);
      return;
    }

    setErrorRequiredInputs(false);

    if (stayConnected) {
      localStorage.setItem("userName", transformEmail(email.value));
      localStorage.setItem("sessionKey", "xxx");
    } else {
      sessionStorage.setItem("userName", transformEmail(email.value));
      sessionStorage.setItem("sessionKey", "xxx");
    }
    setIsLogged(true);
    await ForLoginSimulation();
    setLoading(false);
  };

  const renderForm = () => {
    const renderButtonSubmit = () => {
      return (
        <button className="button-submit" type="submit">
          {loading ? (
            <ThreeDots
              visible={true}
              height="15"
              width="40"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Entrar"
          )}
        </button>
      );
    };
    const renderErrorRequiredInputs = () => {
      if (errorRequiredInputs) {
        return (
          <span className="error-required-inputs">
            Os campos e-mail e senha são obrigatórios
          </span>
        );
      }
      return <></>;
    };

    return (
      <form className="form" onSubmit={handleLogin}>
        <InputEmail />
        <InputPassword />
        {renderButtonSubmit()}
        {renderErrorRequiredInputs()}
      </form>
    );
  };

  const renderOtherActions = () => {
    return (
      <div>
        <div className="input-checkbox">
          <input
            type="checkbox"
            id="checkbox"
            checked={stayConnected}
            onChange={() => setStayConnected(!stayConnected)}
          />
          <label className="label-checkbox" htmlFor="checkbox">
            Mantenha-me conectado
          </label>
        </div>
        <div className="container-other-actions">
          <a href="https://teddydigital.io/">Cadastre-se</a>
          <a href="https://teddydigital.io/">Recuperar senha</a>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLogged(false);
  };

  const renderContent = () => {
    if (isLoagged) {
      return (
        <React.Suspense fallback="Loading...">
          <Header
            hadleLogout={handleLogout}
            onChangeRouter={(value: string) => {
              setCurrentRouter(value);
            }}
          />
          {/* <RemoteApp /> */}
          {currentRouter == "/" ? (
            <iframe src="http://localhost:5174/?page=0"></iframe>
          ) : (
            <iframe src="http://localhost:5174/about"></iframe>
          )}
        </React.Suspense>
      );
    }
    return (
      <div className="container-login">
        <h2>Olá</h2>
        <span className="span-header">Faça login agora mesmo</span>
        {renderForm()}
        {renderOtherActions()}
      </div>
    );
  };

  return <div className="container">{renderContent()}</div>;
}

export default App;
