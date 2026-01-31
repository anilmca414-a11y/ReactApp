import React, { useEffect, useState } from "react";
import axios from "axios";
import "./autosuggest.css";

const AutoSuggestInput = ({
  label,
  value,
  onChange,
  apiUrl,
  displayKey,
  placeholder
}) => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!value || value.length < 2) {
      setList([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const url = `${apiUrl}?search=${encodeURIComponent(value)}`;
        console.log("API CALL →", url);

        const response = await axios.get(url);

        // IMPORTANT: ensure array
        if (Array.isArray(response.data)) {
          setList(response.data);
        } else {
          setList([]);
        }
      } catch (error) {
        console.error("Autosuggest API error:", error);
        setList([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, apiUrl]);

  return (
    <div className="auto-container">
      <label>{label}</label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setShow(true);
        }}
        onBlur={() => setTimeout(() => setShow(false), 200)}
      />

      {show && list.length > 0 && (
        <ul className="auto-list">
          {list.map((item, index) => (
            <li
              key={index}
              onMouseDown={() => {
                onChange(item[displayKey]);
                setShow(false);
              }}
            >
              {item[displayKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggestInput;
