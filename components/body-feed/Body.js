import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import MainFeed from "./MainFeed";
import SideBarRight from "./side-bar/SideBarRight";
import SideBar from "./side-bar/SideBar";

const Body = () => {
  return (
    <Row style={{ paddingTop: "20px", backgroundColor: "#f4f4f4" }}>
      {/* //? SideBar Left */}
      <Col
        style={{
          backgroundColor: "red",
        }}
      >
        <SideBar right={0} />
      </Col>
      <MainFeed />
      {/* //? SideBar Right */}
      <Col>
        <SideBarRight />
      </Col>
    </Row>
  );
};

export default Body;
