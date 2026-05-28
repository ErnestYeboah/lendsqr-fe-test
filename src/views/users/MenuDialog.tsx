import { MdOutlineVisibility } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BsFillPersonXFill } from "react-icons/bs";
import { useEffect, useRef } from "react";

import type { User } from "../../store/features/users_slice";

interface MenuDialogProps {
  user: User;
  onActivateUser: (user: User) => void;
  onBlacklistUser: (user: User) => void;
  onClose: () => void;
  onViewDetails: (user: User) => void;
}

const MenuDialog = ({
  user,
  onActivateUser,
  onBlacklistUser,
  onClose,
  onViewDetails,
}: MenuDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div ref={dialogRef} className="menu_dialog" role="menu">
      <button type="button" role="menuitem" onClick={() => onViewDetails(user)}>
        <MdOutlineVisibility />
        View Details
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={() => onBlacklistUser(user)}
      >
        <BsFillPersonXFill />
        Blacklist User
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={() => onActivateUser(user)}
      >
        <CiUser />
        Activate User
      </button>
    </div>
  );
};

export default MenuDialog;
