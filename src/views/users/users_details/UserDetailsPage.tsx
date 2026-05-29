import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  activateUser,
  blacklistUser,
  usersReducer,
} from "../../../store/features/users_slice";
import type { AppDispatch } from "../../../store/store";
import UserDetailsHeader from "./UserDetailsHeader";
import type { UserDetailsTab } from "./UserDetailsHeader";
import "./details.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import PersonalInformationWrapper from "./PersonalInformationWrapper";
import { useEffect, useState } from "react";
import UnavailablePage from "./UnavailablePage";

const UserDetailsPage = () => {
  useEffect(() => {
    document.title = "Lendsqr | User Details";
  }, []);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { users, selectedUser } = useSelector(usersReducer);

  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState<UserDetailsTab>("General Details");

  const foundUser =
    selectedUser && selectedUser.id === id
      ? selectedUser
      : users.find((user) => user.id === id) || null;

  if (!foundUser) {
    return (
      <div className="p-(--padding)">
        <button
          onClick={() => navigate(-1)}
          className="back_btn text-(--accent-color) text-(length:--step--1) flex items-center gap-2"
        >
          <HiOutlineArrowNarrowLeft />
          Back to Users
        </button>
        <p className="mt-6 text-(--accent-color)">No user selected</p>
      </div>
    );
  }

  const statusClass = foundUser.status.toLowerCase();
  const isBlacklisted = statusClass === "blacklisted";
  const isActive = statusClass === "active";

  return (
    <div className="details_page">
      <Link
        to="/admin/users"
        className="text-(--accent-color) text-(length:--step--1) flex items-center gap-2"
      >
        <HiOutlineArrowNarrowLeft />
        Back to Users
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="mt-6 text-(--accent-color) text-(length:--step-0)">
          User Details
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() =>
              dispatch(blacklistUser({ ...foundUser, status: "Blacklisted" }))
            }
            disabled={isBlacklisted}
            className={
              isBlacklisted
                ? "details_btns blacklist_btn active"
                : "details_btns blacklist_btn"
            }
          >
            BLACKLIST USER
          </button>

          <button
            onClick={() =>
              dispatch(activateUser({ ...foundUser, status: "Active" }))
            }
            disabled={isActive}
            className={
              isActive
                ? "details_btns activate_btn active"
                : "details_btns activate_btn"
            }
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      <UserDetailsHeader
        user={foundUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "General Details" ? (
        <PersonalInformationWrapper selectedUser={foundUser} />
      ) : (
        <UnavailablePage onGoBack={() => setActiveTab("General Details")} />
      )}
    </div>
  );
};

export default UserDetailsPage;
