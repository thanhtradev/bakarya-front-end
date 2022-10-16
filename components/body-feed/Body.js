import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import MainFeed from "./MainFeed";
import SideBarRight from "./side-bar/side-bar-right/SideBarRight";
import SideBar from "./side-bar/SideBar";

const Body = ({ posts }) => {
  return (
    <Container fluid>
      <Row
        style={{
          paddingTop: "20px",
          backgroundColor: "#f4f4f4",
          padding: "20px 0 0 0",
        }}
      >
        {/* //? SideBar Left */}
        <Col
          style={{
            backgroundColor: "red",
          }}
        >
          <SideBar right={0} />
        </Col>
        <MainFeed posts={posts} />
        {/* //? SideBar Right */}
        <Col>
          <SideBarRight />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
