import MainNavbar from "@/Components/Shared/Main Navbar/MainNavbar";
import MainFooter from "@/Components/Shared/MainFooter";
import { getUserSession } from "@/lib/core/session";

const MainLayout = ({ children }) => {
  
  return (
    <div>
      <MainNavbar/>
      {children}
      <MainFooter />
    </div>
  );
};
export default MainLayout;
