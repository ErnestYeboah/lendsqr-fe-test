import type { User } from "../../../store/features/users_slice";
import UserDetailsWrapper from "./UserDetailsWrapper";

const PersonalInformationWrapper = ({
  selectedUser,
}: {
  selectedUser: User;
}) => {
  const personalInformation = [
    { label: "FULL NAME", value: selectedUser.name },
    { label: "PHONE NUMBER", value: selectedUser.phoneNumber },
    { label: "EMAIL ADDRESS", value: selectedUser.email },
    { label: "BVN", value: selectedUser.bvn },
    { label: "GENDER", value: selectedUser.gender },
    { label: "MARITAL STATUS", value: selectedUser.maritalStatus },
    { label: "CHILDREN", value: selectedUser.children || "None" },
    { label: "TYPE OF RESIDENCE", value: selectedUser.residence },
  ];

  const educationAndEmployment = [
    { label: "LEVEL OF EDUCATION", value: selectedUser.educationLevel },
    { label: "EMPLOYMENT STATUS", value: "Employed" },
    { label: "SECTOR OF EMPLOYMENT", value: selectedUser.sector },
    {
      label: "DURATION OF EMPLOYMENT",
      value: `${selectedUser.durationOfEmployment} years`,
    },
    { label: "OFFICE EMAIL", value: selectedUser.email },
    { label: "MONTHLY INCOME", value: selectedUser.income },
    { label: "LOAN REPAYMENT", value: selectedUser.loanRepayment },
  ];

  const socials = [
    {
      label: "TWITTER",
      value: `@${selectedUser.name.toLowerCase().replace(/\s+/g, "_")}`,
    },
    { label: "FACEBOOK", value: selectedUser.name },
    {
      label: "INSTAGRAM",
      value: `@${selectedUser.name.toLowerCase().replace(/\s+/g, "_")}`,
    },
  ];

  const guarantor = [
    { label: "FULL NAME", value: selectedUser.guarantorEmail.split("@")[0] },
    { label: "PHONE NUMBER", value: selectedUser.guarantorPhoneNumber },
    { label: "EMAIL ADDRESS", value: selectedUser.guarantorEmail },
    { label: "RELATIONSHIP", value: "Guarantor" },
  ];

  return (
    <div className="details_wrapper">
      <UserDetailsWrapper
        title="Personal Information"
        details={personalInformation}
      />
      <UserDetailsWrapper
        title="Education and Employment"
        details={educationAndEmployment}
      />
      <UserDetailsWrapper title="Socials" details={socials} />
      <UserDetailsWrapper title="Guarantor" details={guarantor} />
    </div>
  );
};

export default PersonalInformationWrapper;
