import React from "react";
import "./search.style.scss";
import Switch from "react-switch";
function SearchField({
  placeholder,
  handleChange,
  name,
  fetchData,
  disabledButton,
  handleSwitch,
  unitToggle,
  handleButtonClick,
}) {
  return (
    <div className="search">
      <div className="switch">
        <label htmlFor="small-radius-switch">
          <Switch
            onChange={handleSwitch}
            checked={unitToggle}
            className="react-switch"
            disabled={disabledButton}
            checkedIcon={<div className="unit">C</div>}
            uncheckedIcon={<div className="unit">F</div>}
          />
        </label>
        <span>toggle Units</span>{" "}
      </div>

      <div className="search__box">
        <div className="search__inputField">
          <input
            className="input__field"
            type="search"
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={() => {
            handleButtonClick();
            fetchData();
          }}
          className="search__button"
          disabled={disabledButton}
        >
          Search
        </button>
      </div>
    </div>
  );
}
export default SearchField;
