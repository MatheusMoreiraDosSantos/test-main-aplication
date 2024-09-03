import "./styles.css";

interface IProps {
  hadleLogout: () => void;
  onChangeRouter: (value: string) => void;
}

function Header({ hadleLogout, onChangeRouter }: IProps) {
  const userName =
    localStorage.getItem("userName") || sessionStorage.getItem("userName");

  const handleLogout = () => {
    hadleLogout();
  };

  return (
    <div className="container-header">
      <div>
        <button
          onClick={() => {
            onChangeRouter("/about");
          }}
        >
          Sobre nós
        </button>
        <button
          onClick={() => {
            onChangeRouter("/");
          }}
        >
          Home
        </button>
      </div>
      <div className="header-actions">
        <p>Olá {userName}</p>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}
export default Header;
