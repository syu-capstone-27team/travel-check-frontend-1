import React, { useState, useEffect, useRef } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import listPlusIcon from '../assets/list-plus-icon.svg';
import '../App.css';
import { CgMore } from "react-icons/cg";
import { FaCheckCircle  } from "react-icons/fa";
import { FaBan  } from "react-icons/fa";



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
        setListMenu([...listMenu, { id: Date.now(), name: 'New List', items: [] }]);
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

    return (
        <>
            <Sidebar className={"Sidebar"}>
                <main>
                    <Menu style={{ paddingTop: '20px' }}> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginLeft: '10px', fontSize: '18px'}}>나의 체크리스트</div>
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
                                            size={24}
                                            style={{ 
                                                position: 'relative', 
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => saveListName(list.id)}
                                        />
                                        <FaBan 
                                            size={24}
                                            style={{ 
                                                position: 'relative', 
                                                objectFit: 'cover',
                                                marginRight: '10px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={cancelRenaming} 
                                        />
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        <MenuItem
                                            onClick={() => handleListClick(list)} 
                                            style={{ 
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis',
                                                background: selectedList.id === list.id ? 'lightgrey' : 'none' // Change background color for active list
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
                                    </div>
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
                </main>
            </Sidebar>
        </>
    );
};

export default ToggleSidebar;
