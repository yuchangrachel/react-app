import "../../index.css";
import logo from "./logo.png";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../redux/actions/userActions";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar bg="light" expand="lg">
      <Link to="/">
        <img className="logo__img" src={logo} alt="logo of diary" />
      </Link>
      <Navbar.Brand>
        <Link to="/">Green Diary</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" className="navbar_main">
        <Nav className="m-auto">
          {userInfo ? (
            !userInfo.isAdmin ? (
              <>
                <Nav.Link href="/mydiaries">My Page</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/admin/userlist">My Page</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
            )
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}

          {/* <Nav
            onClick={() => {
              localStorage.removeItem("userInfo");
              history.push("/");
            }}
          >
            Logout
          </Nav> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
