import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: "20px" }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
