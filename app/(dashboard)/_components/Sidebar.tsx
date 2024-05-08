import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

export default function Sidebar() {
  return (
    <div className=" h-full border border-r-1 bg-white overflow-y-auto shadow-sm">
      <div className="p-4">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
