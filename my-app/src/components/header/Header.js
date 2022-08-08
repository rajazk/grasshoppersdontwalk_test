import React from "react";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className="headerWrapper">
      <img src={logo} alt="logo" />
      <h1>GETDOCS</h1>
      <div></div>
    </div>
  )
}

export default Header;