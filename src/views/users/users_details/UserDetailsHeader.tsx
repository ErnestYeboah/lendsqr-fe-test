import { CiUser } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import type { User } from "../../../store/features/users_slice";

// eslint-disable-next-line react-refresh/only-export-components
export const userDetailsTabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;

export type UserDetailsTab = (typeof userDetailsTabs)[number];

interface UserDetailsHeaderProps {
  user: User;
  activeTab: UserDetailsTab;
  onTabChange: (tab: UserDetailsTab) => void;
}

const formatCurrency = (value: string) => {
  const numericValue = Number(String(value).replace(/[^\d.-]/g, ""));

  if (Number.isNaN(numericValue)) {
    return value || "₦0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(numericValue);
};

const UserDetailsHeader = ({
  user,
  activeTab,
  onTabChange,
}: UserDetailsHeaderProps) => {
  return (
    <section className="user_details_header">
      <div className="user_details_summary">
        <div className="user_details_avatar" aria-hidden="true">
          <CiUser />
        </div>

        <div className="user_details_identity">
          <h2>{user.name}</h2>
          <p>{user.id}</p>
        </div>

        <div className="user_details_tier">
          <p>User's Tier</p>
          <div aria-label="User tier: 3 stars">
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>

        <div className="user_details_balance">
          <h3>{formatCurrency(user.income)}</h3>
          <p>{user.bvn}/Providus Bank</p>
        </div>
      </div>

      <nav className="user_details_tabs" aria-label="User details sections">
        {userDetailsTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === activeTab ? "active" : ""}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </section>
  );
};

export default UserDetailsHeader;
