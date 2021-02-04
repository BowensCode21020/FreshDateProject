import React from 'react';

let prevBoundingRect = null;

const transition = 'all 0.3s cubid-bexier(.785,.135,.15,.86)'
const transformOrigin = 'left top'

const playAnimation = elements => {
    if (elements.length > 0) {
        elements.forEach(playAnimation)
    } else {
        elements.style.transition = transition;
        elements.style.transform = "none";
    }
}
class DropDownsContainer extends React.Component {
    componentWillUnmount() {
        prevBoundingRect = this.currentDropDown.getBoundingClientRect();
    }

    componentDidMount() {
        this.currentDropDown = this.dropDownsWrapper;
        if (prevBoundingRect) {
            const currentBoundingRect = this.currentDropDown.getBoundingClientRect();

            const deltaLeft = prevBoundingRect.x - currentBoundingRect.x;
            const deltaWidth = prevBoundingRect.width / currentBoundingRect.width;
            const deltaHeight = prevBoundingRect.height / currentBoundingRect.height;

            const inversDeltaWidth = currentBoundingRect.width / prevBoundingRect.width;
            const inverseDeltaHeight = currentBoundingRect.height / prevBoundingRect.height;

            this.currentDropDown.style.transformOrigin = transformOrigin;
            this.currentDropDown.style.transform = `translateX(${deltaLeft}px) scale(${deltaWidth}, ${deltaHeight})`;

            if (this.props.preventDistortion) {
                this.cancelledOutElements = this.currentDropDown.querySelectorAll(
                    this.props.preventDistortion
                );

                this.cancelledOutElements.forEach(dropDownSection => {
                    dropDownSection.style.transformOrigin =
                        dropDownSection.dataset.transformOrigin || transformOrigin;
                    dropDownSection.style.transform = `scale(${inversDeltaWidth}, ${inverseDeltaHeight})`;
                });
            }

            setTimeout(
                () =>
                    requestAnimationFrame(() => {
                        playAnimation(this.currentDropDown);
                        playAnimation(this.cancelledOutElements);
                    }),
                0
            );
        }
    }

    setRef = dropDownsWrapper => (this.dropDownsWrapper = dropDownsWrapper);
    render() {
        return <div ref={this.setRef}>{this.props.children}</div>;
    }
}

export default DropDownsContainer;