import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralTitle from "../../components/Header/GeneralTitle";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Header/ErrorMessage";
import { login } from "../../redux/actions/userActions";

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //access state
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

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
    dispatch(login(username, password));
  };

  return (
    <Container className="mt-5">
      <GeneralTitle title="LOGIN">
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-secondary"
            className="submitBtn mb-3"
            type="submit"
          >
            Submit
          </Button>
          <p>
            No Account?
            <Link to="/register" className="link-hover">
              Register here
            </Link>
          </p>
        </Form>
      </GeneralTitle>
    </Container>
  );
};

export default LoginPage;
