import { IoBriefcaseSharp } from "react-icons/io5";
import NavList from "./NavList";
import "./sidebar.css";
import { FaChevronDown } from "react-icons/fa6";
import { BsFillHouseFill } from "react-icons/bs";
const SideBar = () => {
  return (
    <>
      <div className="sidebar shadow-lg">
        <figure className="sidebar_header mb-(--padding)">
          <img src="/assets/images/lendsqr_logo.png" alt="" />
        </figure>

        <div>
          <div className="flex gap-2 items-center mb-(--padding) ">
            <IoBriefcaseSharp className="icon" />
            <p className="text-(length:--step-0) text-(--accent-color)">
              Switch Organization
            </p>
            <FaChevronDown color="var(--alt-secondary-color)" />
          </div>
          <div className="flex gap-2 items-center">
            <BsFillHouseFill className="icon" />
            <p className="text-(length:--step-0) text-(--alt-secondary-color)">
              Dashboard
            </p>
          </div>
          <NavList />
        </div>
      </div>
    </>
  );
};

export default SideBar;
