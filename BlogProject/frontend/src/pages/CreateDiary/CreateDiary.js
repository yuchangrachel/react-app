import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Header/ErrorMessage";
import { createDiary } from "../../redux/actions/diaryActions";
import { useHistory } from "react-router-dom";
import GeneralTitle from "../../components/Header/GeneralTitle";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const diaryCreate = useSelector((state) => state.diaryCreate);
  const { error } = diaryCreate;
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDiary(title, content, category));
    if (!title || !content || !category) return;

    history.push("/mydiaries");
  };

  useEffect(() => {
    //call action
    dispatch(createDiary(title, content, category));
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin) {
        history.push("/admin/userlist");
      }
    }
  }, [dispatch]);

  return (
    <GeneralTitle title="Create a diary">
      <Card>
        <Card.Body>
          {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={5}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
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

export default CreateDiary;
