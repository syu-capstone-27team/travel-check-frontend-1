import React from 'react';
import '../../App.css';
import checkedBoxIcon from '../../assets/checkbox-check.svg';

const Checkbox = () => {
    return (
        <div className="container">
            <label className="custom-checkbox">
                <input type="checkbox" />
                    <img src={checkedBoxIcon} alt="checked" />
            </label>
        </div>
    );
}

export default Checkbox;
