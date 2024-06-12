import type { NextPage } from "next";
import ListItem from "@/app/components/listItem";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Overlay from "@/app/components/overlay";
import { AppContext } from "@/app/contexts/AppContext";
import { useContext } from "react";
type ISidebar = {};
const Sidebar: NextPage<ISidebar> = ({}: ISidebar) => {
  const currentRoute = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const onLinkClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Overlay isVisible={isSidebarOpen} onClick={onLinkClick} />
      <div
        className={` fixed  inset-0 overflow-hidden lg:overflow-visible z-30 lg:z-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full "
        } lg:translate-x-0 transition-transform duration-500 ease-in-out w-64  lg:w-1/5`}
        style={{ minWidth: "250px" }}
      >
        <div
          className=" bg-slate-100 lg:pt-12 lg:block"
          style={{ height: "100vh" }}
        >
          <h1
            className="lg:hidden pt-6 pl-4 text-3xl cursor-pointer"
            onClick={onLinkClick}
          >
            <FontAwesomeIcon icon={faXmark} />
          </h1>
          <div className="pt-6 pb-3 pl-6 lg:pl-12 lg:pt-12  ">
            <span className="" style={{ fontSize: " 18px" }}>
              Attendance
            </span>
            <ul className="mt-2 pl-2">
              <ListItem
                url="/attendance/create"
                currentRoute={currentRoute}
                onClick={onLinkClick}
              >
                Create
              </ListItem>
              <ListItem
                url="/attendance/history"
                currentRoute={currentRoute}
                onClick={onLinkClick}
              >
                History
              </ListItem>
            </ul>
          </div>

          <div className=" pl-6 lg:pl-12">
            <span className="" style={{ fontSize: "18px" }}>
              Leave request
            </span>
            <ul className="mt-2 pl-2">
              <ListItem
                url="/leave-request/create"
                currentRoute={currentRoute}
                onClick={onLinkClick}
              >
                Create
              </ListItem>
              <ListItem
                url="/leave-request/history"
                currentRoute={currentRoute}
                onClick={onLinkClick}
              >
                History
              </ListItem>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
