import NavbarInfo from "./NavbarInfo";
import NavbarNavigation from "./NavbarNavigation";

export default function Navbar() {
  return (
    <div className="bg-[#1E1932]">
      <div className="2xl: max-w-[1440px] mx-auto py-4 px-[72px] ">
        <NavbarInfo />
        <NavbarNavigation />
      </div>
    </div>
  );
}
