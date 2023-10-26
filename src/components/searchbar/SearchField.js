import React from "react";
import "./search.style.scss";
function SearchField({
  placeholder,
  handleChange,
  name,
  fetchData,
  disabledButton,
}) {
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
      <button
        onClick={fetchData}
        className="search__button"
        disabled={disabledButton}
      >
        Search
      </button>
    </div>
  );
}
export default SearchField;
