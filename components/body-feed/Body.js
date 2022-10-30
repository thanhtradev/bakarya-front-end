import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import MainFeed from "./MainFeed";
import dynamic from "next/dynamic";
// import SideBarRight from "./side-bar/side-bar-right/SideBarRight";
// import SideBarLeft from "./side-bar/side-bar-left/SideBarLeft";
const SideBarLeft = dynamic(
  () => import("./side-bar/side-bar-left/SideBarLeft"),
  {
    suspense: true,
  }
);
const SideBarRight = dynamic(
  () => import("./side-bar/side-bar-right/SideBarRight"),
  {
    suspense: true,
  }
);

const Body = ({ posts }) => {
  return (
    <MainFeed posts={posts} />
    // <Container fluid>
    //   <Row
    //     style={{
    //       paddingTop: "20px",
    //       backgroundColor: "#f4f4f4",
    //       padding: "20px 0 0 0",
    //     }}
    //   >
    //     {/* //? SideBar Left */}
    //     <Col>
    //       <SideBarLeft />
    //     </Col>

    //     {/* //? SideBar Right */}
    //     <Col>
    //       <SideBarRight />
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default Body;
