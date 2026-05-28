import { Link } from "react-router-dom";
import { navlinks, type Children } from "./navlinks_data";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../store/features/users_slice";
import { useState } from "react";

const NavItem = ({ item }: { item: Children }) => {
  const Icon = item.icon;
  const [selectedLink, setSelectedLink] = useState<string>("");
  const dispatch = useDispatch();

  const onLinkSelcted = (label: string) => {
    dispatch(toggleSideBar(false));
    setSelectedLink(label);
  };

  return (
    <div
      className={
        selectedLink === item.label ? "navlist_item active" : "navlist_item"
      }
      onClick={() => onLinkSelcted(item.label)}
    >
      <Link to={item.to} className="navlist_item_link">
        <Icon />
        <h2 className="text-(length:--step--1)">{item.label}</h2>
      </Link>
    </div>
  );
};

const NavList = () => {
  return (
    <div>
      {navlinks.map((group) => (
        <div key={group.id}>
          <p className="navlist_group_label m-(--padding-min) text-[.8rem] text-gray-600">
            {group.parentLabel}
          </p>

          {group.children.map((item) => (
            <NavItem item={item} key={item.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NavList;
