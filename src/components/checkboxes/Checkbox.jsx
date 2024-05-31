import React from 'react';
import '../../App.css';
import checkedBoxIcon from '../../assets/checkbox-check.svg';
import styles from '../index.module.scss';



const Checkbox = () => {
    return (
        <div className={styles.checkIcon} style={{ opacity:'100%' }}>
            <label className="custom-checkbox">
                <input type="checkbox" />
                    <img style={{ cursor: 'pointer' }} src={checkedBoxIcon} alt="checked" />
            </label>
        </div>
    );
}

export default Checkbox;
