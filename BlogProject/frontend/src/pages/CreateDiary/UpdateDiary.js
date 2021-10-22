import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import GeneralTitle from "../../components/Header/GeneralTitle";
import { updateDiary } from "../../redux/actions/diaryActions";

function UpdateDiary({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const diaryUpdate = useSelector((state) => state.diaryUpdate);
  const { error } = diaryUpdate;
  // const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin) {
        history.push("/admin/userlist");
      }
    }
    //PROBLEM: DID STORE EXISTED DATA
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/diaries/${match.params.id}`);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
      } catch (error) {}
    };

    fetching();
  }, [match.params.id]);

  const updateHandler = (e) => {
    dispatch(updateDiary(match.params.id, title, content, category));
    if (!title || !content || !category) return;
    history.push("/mydiaries");
    e.preventDefault();
  };

  return (
    <GeneralTitle title="Edit A Diary">
      <Card>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content || ""}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="outline-secondary"
              type="submit"
              className="landBtn"
            >
              Update Diary
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </GeneralTitle>
  );
}

export default UpdateDiary;
