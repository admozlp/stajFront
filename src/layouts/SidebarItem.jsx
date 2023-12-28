import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as icons from 'react-bootstrap-icons';

export default function SidebarItem({item, aktif}){
    const [open, setOpen] = useState(false);

    const IconComponent = icons[item.icon];

    const roller = localStorage.getItem("roller");
    

    if (item.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        );
    } else {
        let read = 0;
        return (
            <React.Fragment>
                {item.roller.map(rol => {
                    if (roller.includes(rol) && read === 0) {
                        read = 1;
                        return (
                            <NavLink key={rol} to={item.path || "#"} className={item.id === aktif ? "sidebar-item plain active" : "sidebar-item plain"}>
                                {item.icon && IconComponent && React.createElement(IconComponent)}
                                <small style={{ marginRight: 10 }}></small>
                                {item.title}
                            </NavLink>
                        );
                    } else {
                        console.log(rol);
                        return null;
                    }
                })}
            </React.Fragment>
        );
    }
    
}
