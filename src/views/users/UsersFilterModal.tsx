import { useEffect, useMemo, useRef, useState } from "react";
import { IoCalendarOutline, IoChevronDown } from "react-icons/io5";

import type { User } from "../../store/features/users_slice";

export interface UserFilters {
  company: string;
  email: string;
  joinedAt: string;
  name: string;
  phoneNumber: string;
  status: string;
}

interface UsersFilterModalProps {
  filters: UserFilters;
  users: User[];
  onApply: (filters: UserFilters) => void;
  onClose: () => void;
  onReset: () => void;
}

const emptyFilters: UserFilters = {
  company: "",
  email: "",
  joinedAt: "",
  name: "",
  phoneNumber: "",
  status: "",
};

const uniqueValues = (users: User[], key: keyof User) =>
  Array.from(new Set(users.map((user) => String(user[key])).filter(Boolean)));

const UsersFilterModal = ({
  filters,
  users,
  onApply,
  onClose,
  onReset,
}: UsersFilterModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [draftFilters, setDraftFilters] = useState<UserFilters>(filters);

  const companies = useMemo(() => uniqueValues(users, "company"), [users]);
  const statuses = useMemo(() => uniqueValues(users, "status"), [users]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const updateFilter = (key: keyof UserFilters, value: string) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setDraftFilters(emptyFilters);
    onReset();
  };

  return (
    <div ref={modalRef} className="users_filter_modal">
      <label>
        Organization
        <span className="users_filter_select">
          <select
            value={draftFilters.company}
            onChange={(event) => updateFilter("company", event.target.value)}
          >
            <option value="">Select</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
          <IoChevronDown />
        </span>
      </label>

      <label>
        Username
        <input
          type="text"
          placeholder="User"
          value={draftFilters.name}
          onChange={(event) => updateFilter("name", event.target.value)}
        />
      </label>

      <label>
        Email
        <input
          type="text"
          placeholder="Email"
          value={draftFilters.email}
          onChange={(event) => updateFilter("email", event.target.value)}
        />
      </label>

      <label>
        Date
        <span className="users_filter_date">
          <input
            type="date"
            value={draftFilters.joinedAt}
            onChange={(event) => updateFilter("joinedAt", event.target.value)}
          />
          <IoCalendarOutline />
        </span>
      </label>

      <label>
        Phone Number
        <input
          type="text"
          placeholder="Phone Number"
          value={draftFilters.phoneNumber}
          onChange={(event) => updateFilter("phoneNumber", event.target.value)}
        />
      </label>

      <label>
        Status
        <span className="users_filter_select">
          <select
            value={draftFilters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
          >
            <option value="">Select</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <IoChevronDown />
        </span>
      </label>

      <div className="users_filter_actions">
        <button type="button" className="reset" onClick={handleReset}>
          Reset
        </button>
        <button
          type="button"
          className="apply"
          onClick={() => onApply(draftFilters)}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { emptyFilters };
export default UsersFilterModal;
