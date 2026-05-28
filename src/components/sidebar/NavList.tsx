import { Link } from "react-router-dom";
import { navlinks, type Children } from "./navlinks_data";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../store/features/users_slice";

const NavItem = ({ item }: { item: Children }) => {
  const Icon = item.icon;
  const dispatch = useDispatch();
  const path = location.pathname;
  const split = path.split("/");
  const routeName = split[split.length - 1];
  console.log(path);

  return (
    <div
      className={
        routeName === item.label.toLowerCase()
          ? "navlist_item active"
          : "navlist_item"
      }
      onClick={() => dispatch(toggleSideBar(false))}
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
