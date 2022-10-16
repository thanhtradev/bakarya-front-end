import SideBar from "../SideBar";
import Navigation from "./Navigation";
import Top10Posts from "./TopPost";
const SideBarLeft = ({ top10Posts }) => {
  return (
    <SideBar left={30} position='sticky' top='0'>
      <Navigation />
      <Top10Posts top10Posts={top10Posts} />
    </SideBar>
  );
};

export default SideBarLeft;
