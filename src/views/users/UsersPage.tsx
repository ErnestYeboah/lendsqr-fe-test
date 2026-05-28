import UsersCard from "./UsersCard";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbUsersGroup } from "react-icons/tb";
import { RiNewspaperLine } from "react-icons/ri";
import { FaCoins } from "react-icons/fa6";
import UsersTable from "./UsersTable";
import "./users_page.css";
import { useSelector } from "react-redux";
import { usersReducer } from "../../store/features/users_slice";
import { useEffect } from "react";

const UsersPage = () => {
  const { totalUsers } = useSelector(usersReducer);
  useEffect(() => {
    document.title = "Lendsqr | Users";
  }, []);

  return (
    <div className="p-(--padding) overflow-x-hidden">
      <h2 className="text-(--accent-color) text-(length:--step-1)">Users</h2>
      <div className="users_card_wrapper ">
        <UsersCard>
          <div className="icon_parent first_icon_parent">
            <HiOutlineUsers className="icon first_icon" />
          </div>
          <p className="label">USERS</p>
          <p>{totalUsers?.toLocaleString() || "0"}</p>
        </UsersCard>
        <UsersCard>
          <div className="icon_parent second_icon_parent">
            <TbUsersGroup className="icon second_icon" />
          </div>
          <p className="label">ACTIVE USERS</p>
          <p>{totalUsers?.toLocaleString() || "0"}</p>
        </UsersCard>
        <UsersCard>
          <div className="icon_parent third_icon_parent">
            <RiNewspaperLine className="icon third_icon" />
          </div>
          <p className="label">USERS WITH LOANS</p>
          <p>12,453</p>
        </UsersCard>
        <UsersCard>
          <div className="icon_parent last_icon_parent">
            <FaCoins className="icon last_icon" />
          </div>
          <p className="label">USERS WITH SAVINGS</p>
          <p>102,453</p>
        </UsersCard>
      </div>

      <UsersTable />
    </div>
  );
};

export default UsersPage;
