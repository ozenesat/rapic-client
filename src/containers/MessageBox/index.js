import Text from "common/src/components/Text";
import PropTypes from "prop-types";

function MessageBox({ message, type }) {
  return (
    <Text
      style={{
        color: type == "error" ? "red" : "green",
        marginTop: "10px",
        marginBottom: "10px",
      }}
      content={message}
    />
  );
}

export default MessageBox;

// MessageBox.propTypes = {
//   message: PropTypes.string,
//   type: PropTypes.oneOf(["error", "success"]),
// };
