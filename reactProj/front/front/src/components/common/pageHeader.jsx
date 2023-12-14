import Logo from "./logo";

const PageHeader = ({ title, description }) => {
  return (
    <div className="row mt-3">
      <div className="col-12">
        <h3>
          {title + " "}
          <Logo />
        </h3>

        <p className="fs-5">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
