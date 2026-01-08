import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import menuData from "../menuData";
import "./Menu.css";

const Menu = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate("/");

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">My New ERP</div>

      <div className="menu-list">
        {menuData.map((menu, index) => (
          <div key={index}>
            {/* Parent Menu */}
            <div
              className="menu-item"
              onClick={() => toggleMenu(index)}
            >
              {menu.title}
              <span className="arrow">
                {openIndex === index ? "▼" : "▶"}
              </span>
            </div>

            {/* Child Menu */}
            {openIndex === index && (
              <div className="submenu">
                {menu.children.map((child, i) => (
                  <NavLink
                    key={i}
                    to={`../components/Form${child.path}`}
                    className={({ isActive }) =>
                      isActive
                        ? "submenu-item active"
                        : "submenu-item"
                    }
                  >
                    {child.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
