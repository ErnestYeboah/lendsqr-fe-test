export interface DetailItem {
  label: string;
  value: string | number;
}

interface UserDetailsWrapperProps {
  title: string;
  details: DetailItem[];
}

const UserDetailsWrapper = ({ title, details }: UserDetailsWrapperProps) => {
  return (
    <section className="details_section">
      <h2>{title}</h2>
      <div className="details_grid">
        {details.map((detail) => (
          <div key={detail.label} className="details_item">
            <p>{detail.label}</p>
            <span>{detail.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserDetailsWrapper;
