import React, { useState, useEffect, useRef } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import listPlusIcon from '../assets/list-plus-icon.svg';
import '../App.css';
import { CgMore } from "react-icons/cg";
import { FaCheckCircle  } from "react-icons/fa";
import { FaBan  } from "react-icons/fa";
import styles from './index.module.scss';
import Popup from "reactjs-popup"



const ToggleSidebar = ({ onListSelect, onDuplicateList, onDuplicateTarget, selectedList }) => {
    // State variable to store the list menu
    const [listMenu, setListMenu] = useState([selectedList]);
    // dropdown visibility
    const [dropdownVisible, setDropdownVisible] = useState(null);
    // State variables for renaming
    const [renamingListId, setRenamingListId] = useState(null);
    const [newListName, setNewListName] = useState('');

    // Refs for dropdown and button
    const dropdownRefs = useRef({});

    // selection of list
    const handleListClick = (list) => {
        onListSelect(list);
    };

    // Function to handle adding a new list
    const addList = () => {
        setListMenu([...listMenu, { id: Date.now(), name: 'New List', items: [], saved: false }]);
    };

    const deleteList = (listId) => {
        setListMenu(listMenu.filter(item => item.id !== listId));
    }

    const duplicateList = (list) => {
        const newList = { ...list, id: Date.now() };
        setListMenu([...listMenu, newList]);
        onDuplicateList(list);
        onDuplicateTarget(newList);
    }

    // Function to toggle the dropdown
    const toggleDropdown = (listId) => {
        setDropdownVisible(dropdownVisible === listId ? null : listId);
    };

    // Function to start renaming a list
    const startRenaming = (listId, currentName) => {
        setRenamingListId(listId);
        setNewListName(currentName);
        setDropdownVisible(null);
    };

    // Function to handle the renaming input change
    const handleRenameInputChange = (event) => {
        setNewListName(event.target.value);
    };

    // Function to save the new list name
    const saveListName = (listId) => {
        setListMenu(listMenu.map(list => list.id === listId ? { ...list, name: newListName } : list));
        setRenamingListId(null);
        setNewListName('');
    };

    // Function to cancel renaming
    const cancelRenaming = () => {
        setRenamingListId(null);
        setNewListName('');
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

    // Save function - updates saved state of list
    const saveChecklist = (listId) => {
        setListMenu(listMenu.map(list => list.id === listId ? { ...list, saved: true } : list));
    };

    return (

        <Sidebar className={styles.Sidebar} style={{ width: '429px', minWidth: '0px' }}>
            <Menu style={{ paddingTop: '20px' }}> 
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 className={styles.listSubtitle}>나의 체크리스트</h3>
                    <div className='hover-box' onClick={addList} >
                        <img src={listPlusIcon} alt='추가' style={{ cursor: 'pointer' }}/>
                    </div>
                </div>
                
                {listMenu.map(list => (
                    <div key={list.id} style={{ position: 'relative' }}>
                        {renamingListId === list.id ? (
                            <div className='SidebarMenu'>
                                <input
                                    type="text"
                                    value={newListName}
                                    onChange={handleRenameInputChange}
                                    style={{ flex: '1', marginLeft: '10px' }}
                                />
                                <FaCheckCircle
                                    className='checkCircle'
                                    size={24}
                                    onClick={() => saveListName(list.id)}
                                />
                                <FaBan 
                                    className='cancelX'
                                    size={24}
                                    onClick={cancelRenaming} 
                                />
                            </div>
                        ) : (
                            <div className={styles.menu}>
                                <MenuItem
                                    className={styles.menuItem}
                                    onClick={() => handleListClick(list)} 
                                    style={{ 
                                        textAlign: 'left',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis',
                                        background: selectedList.id === list.id ? 'rgba(255, 201, 214, 0.298)' : 'none', // Change background color for active list
                                        borderBottom: selectedList.id === list.id ? 'solid rgb(255, 0, 61)' : 'none'
                                    }}>
                                    {list.name}
                                </MenuItem>
                                <CgMore 
                                    className='dots'
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the MenuItem click
                                        toggleDropdown(list.id);
                                    }}
                                    ref={(el) => (dropdownRefs.current[list.id] = el)}
                                />
                                <Popup
                                    trigger={() => (
                                        <button className="save" onClick={() => saveChecklist(list.id)}>
                                            Save
                                        </button>
                                    )}
                                    position="right center"
                                    closeOnDocumentClick
                                >
                                    <span> Checklist Stored </span>
                                </Popup>                            </div>
                        )}
                        {dropdownVisible === list.id && (
                            <div 
                                className="dropdown-menu" 
                                ref={(el) => (dropdownRefs.current[list.id] = el)}
                                style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(10%)' }}
                            >
                                <div className='dropdown-item' onClick={() => duplicateList(list)}>Duplicate</div>
                                <div className="dropdown-item" onClick={() => startRenaming(list.id, list.name)}>Rename</div>
                                <div className="dropdown-item" onClick={() => deleteList(list.id)}>Delete</div>
                            </div>
                        )}
                    </div>

                ))}
            </Menu>

        </Sidebar>

    );
};

export default ToggleSidebar;
