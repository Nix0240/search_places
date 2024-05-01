import React, { useEffect, useRef } from "react";
import "../SearchBox/searchBox.style.css";

const SearchBox = ({ value, onChange, onKeyPress }) => {
  const ref = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleFocus);

    return () => {
      document.removeEventListener("keydown", handleFocus);
    };
  }, []);

  const handleFocus = (e) => {
    if (e.ctrlKey && e.key === "/") {
      ref.current.focus();
    }
  };

  return (
    <div className="searchBoxContainer">
      <input
        type="text"
        className="searchBox"
        placeholder="Search places..."
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        ref={ref}
      />
      <div className="shortcutBox">Ctrl + /</div>
    </div>
  );
};

export default SearchBox;
