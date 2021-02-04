import React, { Component } from 'react';
import DropDownsContainer from '../dropdowns/DropDownsContainer';
import DropDowns from '../dropdowns/DropDowns';
const navigation = [
    {
        title: "Menu",
        dropdown: DropDowns
    }
];

class Menu extends Component {

    state = {
        activeIndices: []
    };

    onMouseEnter = event => {
        const currentIndex = Number(event.currentTarget.dataset.index)
        if (this.state.activeIndices[this.state.activeIndices.length + 1] === currentIndex) return;
        this.setState(prevState => ({
            activeIndices: prevState.activeIndices.concat(currentIndex)
        }));
    };

    onMouseLeave = () => {
        this.setState({
            activeIndices: []
        });
    };

    render() {
        let CurrentDropdown;
        let PreviousDropdown;

        const previousIndex = this.state.activeIndices[this.state.activeIndices.length];
        const currentIndex = this.state.activeIndices[this.state.activeIndices.length + 1];

        if (typeof currentIndex === "number") {
            CurrentDropdown = navigation[currentIndex].dropdown;
        }

        if (typeof previousIndex === "number") {
            PreviousDropdown = navigation[previousIndex].dropdown;
        }

        return (
            <div className="menu">
                <nav className="menu-nav" onMouseLeave={this.onMouseLeave}>
                    <ul className="links">
                        {navigation.map((n, index) => {
                            return (
                                <div className="navbar-item-el"
                                    onMouseEnter={this.onMouseEnter}
                                    onFocus={this.onMouseEnter}
                                    data-index={index}
                                    key={index}>

                                    <button className="navbar-item-title">{n.title}</button>
                                    <div className="dropdown-slot">
                                        {currentIndex === index && (
                                            <div>
                                                <DropDownsContainer preventDistortion="[data-prevent-distortion]">
                                                    <div
                                                        className="caret"
                                                        data-prevent-distortion
                                                        data-transform-origin="left bottom" />
                                                    <div className="dropdown-background">
                                                        {PreviousDropdown && <PreviousDropdown prev />}
                                                        <CurrentDropdown current />
                                                    </div>
                                                </DropDownsContainer>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                    </ul>
                    {/* <ul class="actions vertical">
                <li><a href="#" class="button fit">Login</a></li>
              </ul> */}
                </nav>
            </div>
        );


    }

}

export default Menu;