import React, { useState, useEffect, useRef } from 'react';
import plusIcon from '../assets/list-plus-icon.svg';
import Checkbox from './checkboxes/Checkbox';
import UnCheckbox from './checkboxes/UnCheckbox';
// import { CgMore } from "react-icons/cg";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

import styles from './index.module.scss';


const Column = ({ column, categoryList, checkList, selectedList, setListState, addCategory, addChecklistItem, removeCategory, removeChecklistItem, toggleChecklistItemChecked, handleInputChange }) => {
    // dropdown visibility
    const [dropdownVisible, setDropdownVisible] = useState(null);
    // collapse state
    const [collapsedCategories, setCollapsedCategories] = useState({});

    // Refs for dropdown and button
    const dropdownRefs = useRef({});

    // // Function to toggle the dropdown
    // const toggleDropdown = (categoryId) => {
    //     setDropdownVisible(dropdownVisible === categoryId ? null : categoryId);
    // };

    // Function to toggle collapse state
    const toggleCollapse = (categoryId) => {
        setCollapsedCategories({
            ...collapsedCategories,
            [categoryId]: !collapsedCategories[categoryId]
        });
    };

    // Effect to handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownVisible && dropdownRefs.current[dropdownVisible] && !dropdownRefs.current[dropdownVisible].contains(event.target)) {
                setDropdownVisible(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible]);

    return (
        <div key={column} className={styles.categoryColumn}>
            {categoryList.filter(category => category.column === column).map(category => (
                <div key={category.id} style={{ marginBottom: '20px', position: 'relative' }}>
                    <div className='category-container'>
                        <input className='category-title'
                            type="text"
                            placeholder="Category title"
                            value={category.text}
                            onChange={(e) => {
                                const newCategoryList = categoryList.map(cat =>
                                    cat.id === category.id ? { ...cat, text: e.target.value } : cat
                                );
                                setListState(selectedList.id, {
                                    categoryList: newCategoryList
                                });
                            }}
                        />
                        <div className='category-options'>
                            <button className='toggle-button' onClick={() => toggleCollapse(category.id)}>
                                {collapsedCategories[category.id] ? <FaChevronDown /> : <FaChevronUp />}
                            </button>
                            <FaTimes 
                                className={styles.checkIcon}
                                style={{
                                    marginLeft: '5px'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the MenuItem click
                                    removeCategory(category.id);
                                }}
                            />
                        </div>

                        {dropdownVisible === category.id && (
                            <div 
                                className="dropdown-menu" 
                                ref={(el) => (dropdownRefs.current[category.id] = el)}
                            >
                                <div className='dropdown-item' >Duplicate</div>
                                <div className="dropdown-item" onClick={() => removeCategory(category.id)}>Delete</div>
                            </div>
                        )}
                    </div>
                    {!collapsedCategories[category.id] && (
                        <>
                            {checkList.filter(item => item.categoryId === category.id).map(item => (
                                <div key={item.id} className={styles.checkItemRow}>
                                    <div onClick={() => toggleChecklistItemChecked(item.id)}>
                                        {item.checked ? <Checkbox /> : <UnCheckbox />}
                                    </div>

                                    <textarea
                                        id={`textarea-${item.id}`}
                                        className={styles.checkItem}
                                        placeholder='New item'
                                        value={item.text}
                                        onChange={(e) => handleInputChange(item.id, e)}
                                        rows={1}
                                        style={{ flex: 1, marginRight: '10px', border: 'none', }}
                                    />
                                    <FaTimes 
                                        className={styles.checkIcon}
                                        style={{ marginRight: '12px' }}
                                        onClick={() => removeChecklistItem(item.id)} />

                                </div>
                            ))}
                            <div className='hover-box' onClick={() => addChecklistItem(category.id)} style={{ width: '15%', margin: '0 auto' }}>
                                <img className='plusImage' src={plusIcon} alt='추가' />
                            </div>
                            <hr style={{ marginTop: '30px' }} />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Column;
