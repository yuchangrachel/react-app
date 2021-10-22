import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import GeneralTitle from "../../components/Header/GeneralTitle";
import { updateUser } from "../../redux/actions/adminActions";
import { useHistory } from "react-router-dom";

function UpdateUser({ match }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error } = userUpdate;
  const history = useHistory();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(match.params.id, username, email, password));
    if (!username || !email || !password) return;

    history.push("/admin/userlist");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!userInfo.isAdmin) {
        history.push("/mydiaries");
      }
    }
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/admin/${match.params.id}`);
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
      } catch (error) {}
    };

    fetching();
  }, [match.params.id]);

  return (
    <GeneralTitle title="Edit User info">
      <Card>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter the username"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="outline-secondary"
              type="submit"
              className="landBtn"
            >
              Update User
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </GeneralTitle>
  );
}

export default UpdateUser;
