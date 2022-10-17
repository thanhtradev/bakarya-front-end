import SideBar from "../SideBar";
import Navigation from "./Navigation";
import Top10Posts from "./TopPost";
const SideBarLeft = ({ top10Posts }) => {
  return (
    <SideBar
      left={30}
      position='fixed'
      bottom='0'
      overflowY='scroll'
      paddingTop='280px'
    >
      <Navigation />
      <Top10Posts top10Posts={top10Posts} />
    </SideBar>
  );
};

export default SideBarLeft;
