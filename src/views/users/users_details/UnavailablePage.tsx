import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

interface UnavailablePageProps {
  onGoBack: () => void;
}

const UnavailablePage = ({ onGoBack }: UnavailablePageProps) => {
  return (
    <section className="unavailable_page">
      <p>Page is unavailable</p>
      <button type="button" onClick={onGoBack}>
        <HiOutlineArrowNarrowLeft />
        Go Back
      </button>
    </section>
  );
};

export default UnavailablePage;
