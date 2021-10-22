import { useEffect } from "react";
import GeneralTitle from "../../components/Header/GeneralTitle";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Accordion } from "react-bootstrap";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../../redux/actions/adminActions";

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersGet = useSelector((state) => state.usersGet);
  const { error, users } = usersGet;

  const userCreate = useSelector((state) => state.userCreate);
  const { success: successCreated } = userCreate;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdated } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDeleted } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!userInfo.isAdmin) {
        history.push("/mydiaries");
      }
    }
    //call action
    dispatch(getUser());
  }, [
    dispatch,
    successCreated,
    userInfo,
    history,
    successUpdated,
    successDeleted,
  ]);

  const deletHandler = (id) => {
    if (window.confirm("Are you sure delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <GeneralTitle title={`Welcome Back ${userInfo && userInfo.username}`}>
      <Link to="/admin/create">
        <Button variant="outline-secondary" className="submitBtn my-3">
          Create New User
        </Button>
      </Link>
      <Accordion>
        {users &&
          users.map((user, i) => (
            <div className="card_block" key={i}>
              <div className="card_heading px-2 my-2">
                <h4 className="card_heading_title">
                  <Accordion.Toggle
                    as={Card.Text}
                    variant="link"
                    eventKey={user._id}
                  >
                    {user.username}
                  </Accordion.Toggle>
                </h4>
                <div>
                  <Button
                    variant="outline-secondary"
                    className="submitBtn"
                    href={`/admin/update/${user._id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="submitBtn mx-3"
                    onClick={() => deletHandler(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Accordion.Collapse eventKey={user._id}>
                <div>
                  <div>{user.email}</div>
                  {/* <div>{user.password}</div> */}
                </div>
              </Accordion.Collapse>
            </div>
          ))}
      </Accordion>
    </GeneralTitle>
  );
};

export default UserList;
