
import React from 'react';

    const MenuDropdown = ({current, prev}) => {
        return (
            <div className="menu-dropdown-el dropdown-el" data-current={current} data-prev={prev}>
                <div data-prevent-distortion>
                    <div className="dropdown-section">
                        <ul className="menu-section">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Fresh Resources</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };


export default MenuDropdown;



