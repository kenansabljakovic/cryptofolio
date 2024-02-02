import NavbarInfo from "./NavbarInfo";
import NavbarNavigation from "./NavbarNavigation";

export default function Navbar() {
    return (
        <div className="2xl: max-w-[1440px] mx-auto bg-[#1E1932]">
        <NavbarInfo />
        <NavbarNavigation />
        </div>
    )
}