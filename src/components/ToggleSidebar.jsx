import React, { useState, useEffect, useRef } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import folderPlusIcon from '../assets/folderPlus-icon.svg';
import '../App.css';
import { CgMore } from "react-icons/cg";

const ToggleSidebar = ({ onListSelect, selectedList }) => {
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
        setListMenu([...listMenu, { id: Date.now(), name: 'New List', items: [] }]);
    };

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

    return (
        <>
            <Sidebar className={"Sidebar"}>
                <main>
                    <Menu style={{ paddingTop: '20px' }}> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>나의 체크리스트</div>
                            <div className='hover-box' onClick={addList} >
                                <img src={folderPlusIcon} alt='추가' />
                            </div>
                        </div>
                        
                        {listMenu.map(list => (
                            <div key={list.id} style={{ position: 'relative' }}>
                                {renamingListId === list.id ? (
                                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                                        <input
                                            type="text"
                                            value={newListName}
                                            onChange={handleRenameInputChange}
                                            style={{ flex: 1, marginRight: '10px' }}
                                        />
                                        <button onClick={() => saveListName(list.id)}>Save</button>
                                        <button onClick={cancelRenaming}>Cancel</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                        <MenuItem 
                                            onClick={() => handleListClick(list)} 
                                            style={{ 
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis'
                                            }}>
                                            {list.name}
                                        </MenuItem>
                                        <CgMore 
                                            className='dots'
                                            style={{ fontSize: '20px', padding: '15px', }} 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the MenuItem click
                                                toggleDropdown(list.id);
                                            }}
                                            ref={(el) => (dropdownRefs.current[list.id] = el)}
                                        />
                                    </div>
                                )}
                                {dropdownVisible === list.id && (
                                    <div className="dropdown-menu" ref={(el) => (dropdownRefs.current[list.id] = el)}>
                                        <div className="dropdown-item" onClick={() => startRenaming(list.id, list.name)}>Rename</div>
                                        <div className="dropdown-item" onClick={() => { console.log("Delete clicked"); setDropdownVisible(null); }}>Delete</div>
                                    </div>
                                )}
                            </div>

                        ))}
                    </Menu>
                </main>
            </Sidebar>
        </>
    );
};

export default ToggleSidebar;
