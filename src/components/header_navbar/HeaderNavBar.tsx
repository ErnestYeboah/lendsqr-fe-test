import { IoIosSearch } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { IoCaretDownSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../store/features/users_slice";
import InternetStatusBar from "../InternetStatusBar";
const HeaderNavBar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <InternetStatusBar />
      <nav className="shadow-sm sticky max-w-full left-0 right-0 top-0 h-16 px-(--padding-min) bg-(--primary-color) flex justify-between">
        <div className="flex h-[70%] max-[992px]:hidden max-w-100 overflow-hidden rounded-sm">
          <input
            type="search"
            name="search"
            placeholder="Search for anything"
            className="h-full min-w-0 flex-1 border border-gray-200 px-4  "
          />
          <button className="flex h-full w-14 shrink-0 items-center justify-center bg-(--secondary-color) p-0">
            <IoIosSearch color="var(--primary-color)" size={15} />
          </button>
        </div>

        <div className="flex gap-(--gap) items-center justify-end max-[992px]:hidden">
          <a className="text-(--accent-color) underline" href="/">
            Docs
          </a>
          <CiBellOn size={"25"} />
          <figure className="avatar">
            <img
              width={"40"}
              className="rounded-full"
              src="/assets/images/avatar.png"
              alt="User Avatar"
            />
          </figure>
          <p className="text-(--accent-color) flex items-center content-center gap-3">
            Adedeji
            <IoCaretDownSharp size={"10"} />
          </p>
        </div>

        <div className="mobile_header_items ">
          <LuMenu
            size={25}
            className="cursor-pointer"
            onClick={() => dispatch(toggleSideBar(true))}
          />
          <div className="flex gap-(--gap) items-center">
            <CiBellOn size={"25"} />
            <figure className="avatar">
              <img
                width={40}
                className="rounded-full"
                src="/assets/images/avatar.png"
                alt="User Avatar"
              />
            </figure>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderNavBar;
