import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import MainFeed from "./MainFeed";
import SideBarRight from "./side-bar/side-bar-right/SideBarRight";
import SideBarLeft from "./side-bar/side-bar-left/SideBarLeft";
const Body = ({ posts, top10Posts }) => {
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
        <Col>
          <SideBarLeft top10Posts={top10Posts} />
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
