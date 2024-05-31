import React from 'react';
import '../../App.css';
import uncheckedBoxIcon from '../../assets/checkbox-uncheck.svg';
import styles from '../index.module.scss';

const UnCheckbox = () => {
    return (
        <div className={styles.checkIcon}>
            <label className="custom-checkbox">
                <input type="checkbox" />
                    <img src={uncheckedBoxIcon} alt="unchecked" />
            </label>
        </div>
    );
}

export default UnCheckbox;
