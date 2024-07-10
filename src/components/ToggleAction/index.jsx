import PropTypes from "prop-types";
import "./styles.css";

const ToggleAction = ({ setIsSign }) => {
  return (
    <div className="toggle-component">
      <button onClick={() => setIsSign(true)}>Sign</button>
      <button onClick={() => setIsSign(false)}>Verify</button>
    </div>
  );
};

export default ToggleAction;

ToggleAction.propTypes = {
  setIsSign: PropTypes.func,
};
