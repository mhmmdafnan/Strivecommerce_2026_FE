import "../Style/Toggle.css"

const ToggleDarkMode = ({darkMode, setDarkMode}) => {  

  const handleChange = () => {
    setDarkMode(!darkMode);
  };

    return (
        // <!-- From Uiverse.io by Galahhad --> 
        <label className="ui-switch">
            <input 
                type="checkbox"
                checked={darkMode}
                onChange={handleChange}
            ></input>
            <div className="slider">
                <div className="circle"></div>
            </div>
        </label>

    )
}

export default ToggleDarkMode;