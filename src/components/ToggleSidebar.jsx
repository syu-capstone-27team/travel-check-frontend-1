import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';

const ToggleSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
        {/* <Sidebar className={"Sidebar"}>
            <Menu>
                <SubMenu label="Charts">
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar> */}
        <Sidebar className={"Sidebar"}>
            <Menu
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
                <MenuItem> Documentation</MenuItem>
                <MenuItem> Calendar</MenuItem>
                <MenuItem> E-commerce</MenuItem>
            </Menu>
        </Sidebar>
        </>
    );
};

export default ToggleSidebar;