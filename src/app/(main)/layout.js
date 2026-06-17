import MainNavbar from "@/Components/Shared/Main Navbar/MainNavbar";

export default function MainLayout({ children }) {
    return (
        <div>
            <MainNavbar />
            {children}
        </div>
    )
}