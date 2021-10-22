import { useEffect } from "react";
import GeneralTitle from "../../components/Header/GeneralTitle";
import { Link } from "react-router-dom";
import { Button, Card, Accordion } from "react-bootstrap";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiary, deleteDiary } from "../../redux/actions/diaryActions";
import ErrorMessage from "../../components/Header/ErrorMessage";

const MyDiary = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const diaryGet = useSelector((state) => state.diaryGet);
  const { error, diaries } = diaryGet;

  const diaryCreate = useSelector((state) => state.diaryCreate);
  const { success: successCreated } = diaryCreate;

  const diaryUpdate = useSelector((state) => state.diaryUpdate);
  const { success: successUpdated } = diaryUpdate;

  const diaryDelete = useSelector((state) => state.diaryDelete);
  const { success: successDeleted } = diaryDelete;

  // const history = useHistory();
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo.isAdmin) {
        history.push("/admin/userlist");
      }
    }

    //call action
    dispatch(getDiary());
  }, [
    dispatch,
    successCreated,
    userInfo,
    history,
    successUpdated,
    successDeleted,
  ]);

  const deletHandler = (id) => {
    if (window.confirm("Are you sure delete this diary?")) {
      dispatch(deleteDiary(id));
    }
  };

  return (
    <GeneralTitle title={`Welcome Back ${userInfo && userInfo.username}`}>
      <Link to="createDiary">
        <Button variant="outline-secondary" className="submitBtn my-3">
          Create New Diary
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <Accordion>
        {diaries &&
          diaries.map((diary, i) => (
            <div className="card_block" key={i}>
              <div className="card_heading px-2 my-2">
                <h4 className="card_heading_title">
                  <Accordion.Toggle
                    as={Card.Text}
                    variant="link"
                    eventKey={diary._id}
                  >
                    {diary.title}
                  </Accordion.Toggle>
                </h4>
                <div>
                  <Button
                    variant="outline-secondary"
                    className="submitBtn"
                    href={`/diary/${diary._id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="submitBtn mx-3"
                    onClick={() => deletHandler(diary._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Accordion.Collapse eventKey={diary._id}>
                <div>
                  <span className="category_badge">
                    Category - {diary.category}
                  </span>
                  <p>{diary.content}</p>
                  <blockquote className="blockquote mb-0">
                    <footer className="blockquote-footer">
                      {`created by ${diary.createdAt.substring(0, 10)}`}
                    </footer>
                  </blockquote>
                </div>
              </Accordion.Collapse>
            </div>
          ))}
      </Accordion>
    </GeneralTitle>
  );
};

export default MyDiary;
