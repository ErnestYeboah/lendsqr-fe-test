import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IoChevronBack, IoChevronForward, IoFilter } from "react-icons/io5";
import type { TableComponents } from "react-virtuoso";
import { TableVirtuoso } from "react-virtuoso";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  fetchUsers,
  type User,
  usersReducer,
} from "../../store/features/users_slice";
import type { AppDispatch } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const rowsPerPage = 10;

const columns = [
  { key: "company", label: "ORGANIZATION", width: "14%" },
  { key: "name", label: "USERNAME", width: "15%" },
  { key: "email", label: "EMAIL", width: "23%" },
  { key: "phoneNumber", label: "PHONE NUMBER", width: "16%" },
  { key: "joinedAt", label: "DATE JOINED", width: "20%" },
  { key: "status", label: "STATUS", width: "9%" },
] as const;

type ColumnKey = (typeof columns)[number]["key"];
type SortDirection = "asc" | "desc";

const tableComponents: TableComponents<User> = {
  Scroller: (props) => (
    <TableContainer component={Paper} {...props} className="users_table" />
  ),
  Table: (props) => (
    <Table
      {...props}
      stickyHeader
      sx={{ borderCollapse: "separate", tableLayout: "initial" }}
    />
  ),
  TableHead,
  TableRow,
  TableBody,
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const getSortValue = (user: User, key: ColumnKey) => {
  if (key === "joinedAt") return new Date(user.joinedAt).getTime();

  return String(user[key]).toLowerCase();
};

const fixedHeaderContent = (
  sortKey: ColumnKey,
  sortDirection: SortDirection,
  onSort: (key: ColumnKey) => void,
) => (
  <TableRow>
    {columns.map((column) => (
      <TableCell
        key={column.key}
        className="users_table_head  "
        style={{ width: column.width }}
      >
        <button
          type="button"
          className="users_sort_button"
          onClick={() => onSort(column.key)}
          aria-label={`Sort by ${column.label}`}
        >
          {column.label}
          <IoFilter
            className={
              sortKey === column.key ? `is_sorted ${sortDirection}` : ""
            }
          />
        </button>
      </TableCell>
    ))}
    <TableCell className="users_table_head users_table_action_head" />
  </TableRow>
);

const rowContent = (_index: number, user: User) => (
  <>
    <TableCell>{user.company}</TableCell>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.phoneNumber}</TableCell>
    <TableCell>{formatDate(user.joinedAt)} 10:00 AM</TableCell>
    <TableCell>
      <span className={`status_badge ${user.status.toLowerCase()}`}>
        {user.status}
      </span>
    </TableCell>
    <TableCell className="users_table_action">
      <BsThreeDotsVertical />
    </TableCell>
  </>
);
const UsersTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersByPage, totalUsers, status } = useSelector(usersReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<ColumnKey>("company");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const pageCount = Math.max(1, Math.ceil(totalUsers / rowsPerPage));

  const sortedUsers = useMemo(() => {
    const tableUsers = usersByPage[currentPage] ?? [];

    return [...tableUsers].sort((firstUser, secondUser) => {
      const firstValue = getSortValue(firstUser, sortKey);
      const secondValue = getSortValue(secondUser, sortKey);

      if (firstValue < secondValue) return sortDirection === "asc" ? -1 : 1;
      if (firstValue > secondValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortDirection, sortKey, usersByPage, currentPage]);

  function handleSort(key: ColumnKey) {
    if (sortKey === key) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  }

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [currentPage, dispatch]);

  return (
    <section className="users_table_section">
      <TableVirtuoso
        data={sortedUsers}
        components={tableComponents}
        fixedHeaderContent={() =>
          fixedHeaderContent(sortKey, sortDirection, handleSort)
        }
        itemContent={rowContent}
      />

      <div className="users_table_footer">
        <div className="users_table_showing">
          Showing
          <select value={rowsPerPage} aria-label="Rows per page">
            <option value={rowsPerPage}>{rowsPerPage}</option>
          </select>
          out of {totalUsers || "..."}
        </div>

        <div className="users_pagination">
          <button
            type="button"
            disabled={currentPage === 1 || status === "pending"}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            <IoChevronBack />
          </button>
          <span>{currentPage}</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>{Math.max(pageCount - 1, 1)}</span>
          <span>{pageCount}</span>
          <button
            type="button"
            disabled={currentPage === pageCount || status === "pending"}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UsersTable;
