import React from 'react';
import '../../App.css';
import checkedBoxIcon from '../../assets/checkbox-check.svg';
import styles from '../index.module.scss';



const Checkbox = () => {
    return (
        <div className={styles.checkIcon}>
            <label className="custom-checkbox">
                <input type="checkbox" />
                    <img src={checkedBoxIcon} alt="checked" />
            </label>
        </div>
    );
}

export default Checkbox;
