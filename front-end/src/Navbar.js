import React from 'react';

export default ()=>{
    return(
        <nav className="light-blue lighten-1" role="navigation">
            <div className="nav-wrapper container">
                <ul className="right hide-on-med-and-down">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
                <ul id="nav-mobile" className="sidenav">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
                <a href="#" data-target="nav-mobile" className="sidenav-trigger button-collapse">
                    <i className="material-icons hide-on-large-only">menu</i>
                </a>
            </div>
        </nav>
    )
}