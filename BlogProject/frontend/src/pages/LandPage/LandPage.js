import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandPage.css";
import { useEffect } from "react";

const LandPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      if (userInfo.isAdmin) {
        history.push("/admin/userlist");
      } else {
        history.push("/mydiaries");
      }
    }
  }, [history]);

  return (
    <div className="background__land">
      <Container>
        <Row>
          <div className="intro-text">
            <h1>Welcome Green Garden</h1>
            <p>
              Here is for houseplant enthusiasts and explores the contemporary
              nexus between houseplant care, interiors, photography + design.
            </p>
          </div>
          <div className="btns__landing">
            <Link to="/login">
              <Button variant="outline-secondary" className="landBtn">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="outline-secondary" className="landBtn mx-3">
                Signup
              </Button>
            </Link>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default LandPage;
