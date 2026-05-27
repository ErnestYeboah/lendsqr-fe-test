import { Link } from "react-router-dom";
import { navlinks, type Children } from "./navlinks_data";

const NavItem = ({ item }: { item: Children }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className="navlist_item text-(--alt-secondary-color) flex items-center gap-2 mb-4"
    >
      <Icon />
      <h2 className="text-(length:--step-0)">{item.label}</h2>
    </Link>
  );
};

const NavList = () => {
  return (
    <div className="">
      {navlinks.map((group) => (
        <div key={group.id}>
          <p className="navlist_group_label mt-(--padding-min) mb-4 text-[.8rem]  text-gray-600">
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
