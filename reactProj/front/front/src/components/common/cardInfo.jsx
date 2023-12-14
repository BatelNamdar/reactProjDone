import { useParams } from "react-router-dom";
import { useCard } from "../../hooks/useCard";

const CardInfo = () => {
  const { id } = useParams();
  const { card, error } = useCard(id);
  console.log(card);

  if (error) {
    return <div>Error loading card information</div>;
  }

  if (!card) {
    return <div>Loading...</div>;
  }

  // Now it's safe to access card properties
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-sm-12 col-lg-6 text-center ">
            <h4>{card.title}</h4>
            <h6>{card.subtitle}</h6>
            {/* Render other card information here */}
            <p>{card.description}</p>

            <button className="btn btn-success ">
              <a
                className="text-light text-decoration-non"
                href={`tel:${card.phone}`}
              >
                <i className="bi bi-telephone me-3"></i>
                {card.phone}
              </a>
            </button>
            <br />
            <button
              className="btn btn-success  mt-3
            "
            >
              <a
                className="text-light text-decoration-non"
                href={`mailto:${card.email}`}
              >
                <i className="bi bi-envelope me-3"></i> {card.email}
              </a>
            </button>
            <br />
            <button
              className="btn btn-success  mt-3
            "
            >
              <a
                target={"_blank"}
                className="text-light text-decoration-non"
                href={`https://www.google.com/maps/place/${card.address.street}+St+${card.address.houseNumber}+${card.address.city}+${card.address.country}`}
              >
                <i className="bi bi-map me-3"></i>{" "}
                {card.address.state && card.address.state + ","}{" "}
                {card.address.country && card.address.country + ","}{" "}
                {card.address.city && card.address.city + ","}{" "}
                {card.address.street && card.address.street + ","}{" "}
                {card.address.houseNumber && card.address.houseNumber + ","}{" "}
                {card.address.zip && card.address.zip + "."}
              </a>
            </button>
            <br />
            {card.web && (
              <button
                className="btn btn-success  mt-3
                "
              >
                <a
                  className="text-light text-decoration-non"
                  href={`mailto:${card.web}`}
                >
                  <i className="bi bi-cursor"></i>
                </a>
              </button>
            )}
          </div>
          <div className="col-sm-12 col-lg-6 ">
            <img
              src={`${card.image.url}`}
              style={{ width: "100%" }}
              alt={card.image.alt}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
