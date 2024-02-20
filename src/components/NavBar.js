import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  let navi = useNavigate();
  let location = useLocation();

  const handlePopState = () => {
    // Perform the action you want when the user navigates back
    // For example, you can clear the session or log out the user
    logoutUser();}


    useEffect(() => {
      window.addEventListener("popstate", handlePopState);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, []);

    const logoutUser = () => {
      // Implement your logout logic here
      // For example, clear the session, remove tokens, etc.

      localStorage.removeItem('token')
      console.log("before logout login");
      navi("/login")
      console.log("User logged out");
    };


  useEffect(() => {
    console.log(location);
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem('token')
    console.log("before login");
    navi("/login")
    console.log("After login");
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
        <span class="material-symbols-outlined">
note_alt
</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : " "}`} aria-current="page" to="/">
              
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : " "}`} to="/about">
                About
              </Link>
            </li> */}
            <li className="nav-item dropdown">
            <div style={{color:'white'}}>
            <h3>Organize your notes and stay productive!</h3>
            </div>
          
            </li>
           
          </ul>

          {!localStorage.getItem('token') ? <form >
            <Link class="btn btn-primary" to="/login" style={{ marginRight: 50 }} type="submit">Login</Link>
            <Link class="btn btn-primary" to="/signup" type="submit">Signup</Link>
          </form> : <Link class="btn btn-primary" onClick={handleLogout} to="/login" type="Log">Logout</Link>}
        </div>
      </div>
    </nav>
    <header>
    
</header>
<div style={{display:"flex", marginLeft:480}}>
           <h1>Welcome to My iNotebook</h1>
    
    
    
    </div>

</>
  );
}
