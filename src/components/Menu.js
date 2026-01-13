import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import Header from "./Header";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetch("https://localhost:44364/api/Menu/GetMenus")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);

  const handleParentClick = (menuId) => {
    setOpenMenuId(openMenuId === menuId ? null : menuId);
  };

  return (
    <>
    <Header></Header>
     <aside className="sidebar">
      <div className="content"><h2>ERP system</h2></div>
    
    <div className="sidebar">
      <ul className="menu-list">
        {menuData.map((menu) => (
          <li key={menu.menuId} className="menu-item">
            
            {/* Parent */}
            <div
              className="menu-title"
              onClick={() => handleParentClick(menu.menuId)}
            >
              {menu.menuName}
              <span className="arrow">
                {openMenuId === menu.menuId ? "▼" : "▶"}
              </span>
            </div>

            {/* Child */}
            {menu.children && openMenuId === menu.menuId && (
              <ul className="submenu">
                {menu.children.map((child) => (
                  <li key={child.menuId} className="submenu-item">
                    <NavLink to={child.url}  className="menu-link">
                      {child.menuName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
     </aside>
    </>
  );
};

export default Menu;
