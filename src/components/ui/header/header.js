import React from 'react';
import Navigation from '../navigation/navigationItems';
import { useHistory } from "react-router-dom";
import logo from '../../../assets/kam.webp';

const Header = (props) => {

    const history = useHistory();
    const navigate = (to) => {
        history.push(to);
    }

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img src={logo} alt="logo" />
                    </a>
                    <Navigation isAuthenticated={props.isAuthenticated} />
                    <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" />

                    { !props.isAuthenticated
                        ?   <div className="text-end">
                                <button type="button" className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                                <button type="button" className="btn btn-warning" onClick={() => navigate('/signup')}>Sign-up</button>
                            </div>
                        :   <div className="text-end">
                                <button type="button" className="btn btn-warning" onClick={() => navigate('/logout')}>Logout</button>
                            </div>
                    }
                </div>
            </div>
        </header>
    )
};

export default Header;