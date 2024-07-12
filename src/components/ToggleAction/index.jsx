import PropTypes from "prop-types";
import "./styles.css";

const ToggleAction = ({ isSign, setIsSign }) => {
  return (
    <div className="toggle-component">
      {!isSign ? (
        <button onClick={() => setIsSign(true)}>Sign</button>
      ) : (
        <button onClick={() => setIsSign(false)}>Verify</button>
      )}
    </div>
  );
};

export default ToggleAction;

ToggleAction.propTypes = {
  isSign: PropTypes.bool,
  setIsSign: PropTypes.func,
};
