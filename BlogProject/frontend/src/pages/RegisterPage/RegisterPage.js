import { Button, Container, Form } from "react-bootstrap";
import GeneralTitle from "../../components/Header/GeneralTitle";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Header/ErrorMessage";
import { register } from "../../redux/actions/userActions";

const RegisterPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfiromPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [error, setError] = useState("");

  const dispatch = useDispatch();

  //access state
  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        history.push("/admin/userlist");
      } else {
        history.push("/mydiaries");
      }
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password NOT MATCH");
    } else {
      dispatch(register(username, email, password));
    }
  };

  return (
    <Container className="mt-5">
      <GeneralTitle title="REGISTER">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              controlid="formBasicEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfiromPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-secondary"
            className="submitBtn mb-3"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </GeneralTitle>
    </Container>
  );
};

export default RegisterPage;
