import { IoIosSearch } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { IoCaretDownSharp } from "react-icons/io5";
const HeaderNavBar = () => {
  return (
    <nav className="grid grid-cols-2 items-center justify-between shadow-sm h-20 px-(--padding-min)">
      <div className="flex h-10  max-w-100 overflow-hidden rounded-sm">
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
      <div className="flex gap-(--gap) items-center justify-end">
        <a className="text-(--accent-color) underline" href="/">
          Docs
        </a>
        <CiBellOn size={"25"} />
        <figure className="avatar">
          <img
            className="rounded-full"
            src="/public/assets/images/avatar.png"
            alt="User Avatar"
          />
        </figure>
        <p className="text-(--accent-color) flex items-center content-center gap-3">
          Adedeji
          <IoCaretDownSharp size={"10"} />
        </p>
      </div>
    </nav>
  );
};

export default HeaderNavBar;
