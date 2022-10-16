import SideBar from "../SideBar";
import Navigation from "./Navigation";

const SideBarLeft = () => {
  return (
    <SideBar left={30} position='sticky' top='0'>
      <Navigation />
    </SideBar>
  );
};

export default SideBarLeft;
