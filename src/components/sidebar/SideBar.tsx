import { IoBriefcaseSharp } from "react-icons/io5";
import NavList from "./NavList";
import "./sidebar.css";
import { FaChevronDown } from "react-icons/fa6";
import { BsFillHouseFill } from "react-icons/bs";
import { cn } from "../../utils/clsx_merge";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar, usersReducer } from "../../store/features/users_slice";
const SideBar = () => {
  const { showSideBar } = useSelector(usersReducer);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={cn("sidebar_wrapper", showSideBar ? "active" : "")}
        onClick={() => dispatch(toggleSideBar(false))}
      >
        <div className="sidebar shadow-lg" onClick={(e) => e.stopPropagation()}>
          <figure className="sidebar_header  m-(--padding-min)">
            <img
              className="logo"
              src="/assets/images/lendsqr_logo.png"
              alt=""
            />
          </figure>

          <div>
            <div className="flex gap-2 items-center p-(--padding-min) ">
              <IoBriefcaseSharp className="icon" />
              <p className="text-(length:--step-0) text-(--accent-color)">
                Switch Organization
              </p>
              <FaChevronDown color="var(--alt-secondary-color)" />
            </div>
            <div className="flex gap-2 items-center p-(--padding-min)">
              <BsFillHouseFill className="icon" />
              <p className="text-(length:--step-0) text-(--alt-secondary-color)">
                Dashboard
              </p>
            </div>
            <NavList />
            <a
              href="/"
              className="text-(length:--step-0) underline  text-(--accent-color) px-(--padding-min)"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
