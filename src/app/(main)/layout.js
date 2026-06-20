import MainNavbar from "@/Components/Shared/Main Navbar/MainNavbar";
import MainFooter from "@/Components/Shared/MainFooter";

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
