import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions/adminActions";
import { useHistory } from "react-router-dom";
import GeneralTitle from "../../components/Header/GeneralTitle";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userCreate = useSelector((state) => state.userCreate);
  const { error } = userCreate;

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(username, email, password));
    if (!username || !email || !password) return;

    history.push("/admin/userlist");
  };

  useEffect(() => {
    //call action
    dispatch(createUser(username, email, password));
    if (userInfo) {
      if (!userInfo.isAdmin) {
        history.push("/mydiaries");
      }
    } else {
      history.push("/");
    }
  }, [dispatch]);

  return (
    <GeneralTitle title="Create a New User">
      <Card>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                value={username}
                placeholder="Enter the username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter the eamil"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="outline-secondary"
              className="landBtn"
            >
              Create
            </Button>
          </Form>
        </Card.Body>

        <p>Create on - {new Date().toLocaleDateString()}</p>
      </Card>
    </GeneralTitle>
  );
};

export default CreateUser;
