import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import '../App.css';

const ToggleSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
        <Sidebar className={"Sidebar"}>
            <main>
                <Menu
                    style={{ paddingTop: '20px' }}
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <SubMenu title="나의 체크리스트"> 나의 체크리스트
                        <MenuItem>체크리스트1</MenuItem>
                        <MenuItem>체크리스트2</MenuItem>
                        <MenuItem>체크리스트3</MenuItem>
                    </SubMenu>
                    <MenuItem>체크리스트 등록</MenuItem>
                </Menu>
            </main>
        </Sidebar>
        </>
    );
};

export default ToggleSidebar;
