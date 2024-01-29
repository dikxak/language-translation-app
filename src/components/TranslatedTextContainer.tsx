const TranslatedTextContainer = (): React.JSX.Element => (
  <>
    <h2 className="secondary-heading">Output</h2>
    <div className="translated-text-container">
      <div className="customization-container">
        <label htmlFor="fontSize">
          Update font size
          <input id="fontSize" type="range" />
        </label>

        <label htmlFor="textColor">
          Update text color
          <input id="textColor" type="color" />
        </label>
        <label htmlFor="backgroundColor">
          Update background
          <input id="backgroundColor" type="color" />
        </label>
      </div>
      <div className="translated-text">Hola!</div>
    </div>
  </>
);

export default TranslatedTextContainer;
