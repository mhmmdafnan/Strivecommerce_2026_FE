import "../Style/Toggle.css"

const ToggleDarkMode = () => {
    return (
        // <!-- From Uiverse.io by Galahhad --> 
        <label className="ui-switch">
            <input type="checkbox"></input>
            <div className="slider">
                <div className="circle"></div>
            </div>
        </label>

    )
}

export default ToggleDarkMode;