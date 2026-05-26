import "../css/Header.css";
const Header = ({ cart }) => {
  return (
    <header>
      <div className="header-container">
        <h1>This is header</h1>
        <div className="cart">
          <img
            src="https://imgs.search.brave.com/O19h2-VZObCLWOKnrYmEo6Wnxn4vr_aGr4KvFkRofHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLm1h/Z25pZmljLmNvbS8y/NTYvNTUzMC81NTMw/Mzg2LnBuZz9zZW10/PWFpc193aGl0ZV9s/YWJlbA"
            alt="Cart"
          />
          <span>{cart}</span>
        </div>
      </div>
    </header>
  );
};
export default Header;
