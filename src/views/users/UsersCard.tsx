import type { ReactNode } from "react";

const UsersCard = ({ children }: { children: ReactNode }) => {
  return <div className="user_card">{children}</div>;
};

export default UsersCard;
