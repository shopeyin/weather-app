import React from "react";
import "./search.style.scss";
function SearchField({ placeholder, handleChange, name, fetchData }) {
  return (
    <div className="search">
      <div className="search__input-box">
        <input
          className="search-field"
          type="search"
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
      <button onClick={fetchData} className="search__button">
        Search
      </button>
    </div>
  );
}
export default SearchField;
