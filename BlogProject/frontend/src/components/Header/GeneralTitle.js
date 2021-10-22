import { Container, Row } from "react-bootstrap";
import "./GeneralTitle.css";
const GeneralTitle = ({ title, children }) => {
  return (
    <div className="Generalbg">
      <Container>
        <Row>
          <div className="page">
            {title && <h1 className="heading">{title}</h1>}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default GeneralTitle;
