import {
  FaRegHandshake,
  FaCoins,
  FaSlidersH,
  FaClipboardList,
} from "react-icons/fa";
import {
  PiUsersDuotone,
  PiPiggyBankDuotone,
  PiHandCoinsFill,
} from "react-icons/pi";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { BiSolidUserCheck } from "react-icons/bi";
import { BsFillPersonXFill, BsBank2 } from "react-icons/bs";
import { IoBriefcaseSharp } from "react-icons/io5";
import {
  MdReceiptLong,
  MdMiscellaneousServices,
  MdBarChart,
  MdOutlinePriceChange,
} from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbArrowsTransferDown } from "react-icons/tb";

export interface Children {
  id: number;
  to: string;
  label: string;
  icon: React.ComponentType;
}

export interface Navlinks {
  id: number;
  parentLabel: string;
  children: Children[];
}

export const navlinks: Navlinks[] = [
  {
    id: 1,
    parentLabel: "CUSTOMERS",
    children: [
      {
        id: 1,
        to: "/admin/users",
        label: "Users",
        icon: PiUsersDuotone,
      },
      {
        id: 2,
        to: "/guarantors",
        label: "Guarantors",
        icon: PiUsersThreeDuotone,
      },
      {
        id: 3,
        to: "/admin/users",
        label: "Loans",
        icon: FaSackDollar,
      },
      {
        id: 4,
        to: "/admin/users",
        label: "Decision Models",
        icon: FaRegHandshake,
      },
      {
        id: 5,
        to: "/admin/users",
        label: "Savings",
        icon: PiPiggyBankDuotone,
      },
      {
        id: 6,
        to: "/admin/users",
        label: "Loan Requests",
        icon: PiHandCoinsFill,
      },
      {
        id: 7,
        to: "/admin/users",
        label: "WhiteList",
        icon: BiSolidUserCheck,
      },
      {
        id: 8,
        to: "/admin/users",
        label: "Karma",
        icon: BsFillPersonXFill,
      },
    ],
  },
  {
    id: 2,
    parentLabel: "BUSINESSES",
    children: [
      {
        id: 9,
        to: "/admin/users",
        label: "Organization",
        icon: IoBriefcaseSharp,
      },
      {
        id: 10,
        to: "/admin/users",
        label: "Loan Products",
        icon: PiHandCoinsFill,
      },
      {
        id: 11,
        to: "/admin/users",
        label: "Savings Products",
        icon: BsBank2,
      },
      {
        id: 12,
        to: "/admin/users",
        label: "Fees and Charges",
        icon: FaCoins,
      },
      {
        id: 13,
        to: "/admin/users",
        label: "Transactions",
        icon: MdReceiptLong,
      },
      {
        id: 14,
        to: "/admin/users",
        label: "Services",
        icon: MdMiscellaneousServices,
      },
      {
        id: 15,
        to: "/admin/users",
        label: "Service Account",
        icon: RiUserSettingsFill,
      },
      {
        id: 16,
        to: "/admin/users",
        label: "Settlement",
        icon: TbArrowsTransferDown,
      },
      {
        id: 17,
        to: "/admin/users",
        label: "Reports",
        icon: MdBarChart,
      },
    ],
  },
  {
    id: 3,
    parentLabel: "SETTINGS",
    children: [
      {
        id: 18,
        to: "/admin/users",
        label: "Preferences",
        icon: FaSlidersH,
      },
      {
        id: 19,
        to: "/admin/users",
        label: "Fees and Pricing",
        icon: MdOutlinePriceChange,
      },
      {
        id: 20,
        to: "/admin/users",
        label: "Audit Logs",
        icon: FaClipboardList,
      },
    ],
  },
];
