import React from "react";

function Header({ logout }) {
  return (
    <header className="Header">
      <div className="Logo">Exercise Five</div>
      <nav>
        <a href="/">Login</a>
        <a href="/create">Create User</a>
        <a href="/user/:id">User Profile</a>
        <a onClick={() => logout()}>Log Out</a>
      </nav>
    </header>
  );
}

export default Header;
