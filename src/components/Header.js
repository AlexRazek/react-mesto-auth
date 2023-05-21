import { Link } from "react-router-dom";
import "../index.css";

  const Header = (props) => { 

  function outLogged () {
    localStorage.removeItem("jwt");
    props.setLoggedIn(false);
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <section className="header__auth">
          <p className="header__auth-email">{props.isEmail}</p>
          <Link to={props.route} 
            className="header__auth-text" 
            onClick={ outLogged }
            >{props.text}</Link> 
      </section>
    </header>
  );
}

export default Header;
