import MainNavbar from "@/Components/Shared/Main Navbar/MainNavbar";
import MainFooter from "@/Components/Shared/MainFooter";

export default function MainLayout({ children }) {
    return (
        <div>
            <MainNavbar />
            {children}
            <MainFooter />
        </div>
    )
}