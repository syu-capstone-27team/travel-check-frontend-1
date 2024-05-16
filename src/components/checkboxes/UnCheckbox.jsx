import React from 'react';
import '../../App.css';
import uncheckedBoxIcon from '../../assets/checkbox-uncheck.svg';

const UnCheckbox = () => {
    return (
        <div className="container">
            <label className="custom-checkbox">
                <input type="checkbox" />
                    <img src={uncheckedBoxIcon} alt="unchecked" />
            </label>
        </div>
    );
}

export default UnCheckbox;
