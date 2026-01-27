import "../../assets/css/Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">MyShop</div>

        <div className="header-right">
          <button className="btn login">Login</button>
          <button className="btn register">Register</button>
        </div>
      </div>
    </header>
  );
};
