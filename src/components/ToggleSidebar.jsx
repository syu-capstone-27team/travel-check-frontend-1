import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import folderPlusIcon from '../assets/folderPlus-icon.svg';
import '../App.css';

const ToggleSidebar = ({ onListSelect, selectedList }) => {
    // State variable to store the list menu
    const [listMenu, setListMenu] = useState([selectedList]);

    // selection of list
    const handleListClick = (list) => {
        onListSelect(list);
    }

    // Function to handle adding a new list
    const addList = () => {
        setListMenu([...listMenu, { id: Date.now(), name: 'New List1', items: [] }]);
    };

    
    return (
        <>
        <Sidebar className={"Sidebar"}>
            <main>
                <Menu style={{ paddingTop: '20px' }}> 나의 체크리스트
                    <div className='hover-box' onClick={addList} style={{ display: 'flex', alignItems: 'end'}}>
                        <img src={folderPlusIcon} alt='추가' style={{ marginRight: "5px" }} /> 리스트 추가
                    </div>
                    {listMenu.map(list => (
                        <MenuItem key={list.id} onClick={() => handleListClick(list)}>
                            {list.name}
                        </MenuItem>
                    ))}
                </Menu>
            </main>
        </Sidebar>
        </>
    );
};

export default ToggleSidebar;
