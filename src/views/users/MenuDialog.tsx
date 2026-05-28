import { MdOutlineVisibility } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BsFillPersonXFill } from "react-icons/bs";
const MenuDialog = () => {
  return (
    <div className="menu_dialog bg-(--primary-color) p-(--gap) rounded-(--radius) absolute top-0 right-0 shadow-lg  space-y-4">
      <button>
        <MdOutlineVisibility />
        View Details
      </button>
      <button>
        <BsFillPersonXFill />
        Blacklist User
      </button>
      <button>
        <CiUser />
        Active User
      </button>
    </div>
  );
};

export default MenuDialog;
