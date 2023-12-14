import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import cardServices from "../../services/cardServices";

const CardCreatedByUser = ({
  title = "",
  subtitle = "",
  description = "",
  phone = "",
  email = "",
  web = "",
  image = {
    url: "",
    alt: "",
  },
  address = {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  },
  likes,
  _id,

}) => {
  const { state, country, city, street, houseNumber, zip } = address;
  const { url, alt } = image;
  const { user } = useAuth();

  const [likedByUser, setLikedByUser] = useState(likes.includes(user._id));

  const handleLike = async () => {
    await cardServices.likeCard(_id);
    setLikedByUser(!likedByUser);
  };



  return (
    <>
      <div className="card m-3  ">
        <h2 className="d-flex space-between">
          <button className="bg-success">
            <Link to={`/Mycards/edit/${_id}`}>
              <i class="bi bi-pencil text-light "></i>
            </Link>
          </button>

          <button className="bg-danger">
            <Link to={`/mycards/delete/${_id}`}>
              <i class="bi bi-trash-fill  text-light"></i>
            </Link>
          </button>
         

          <button
            className="ms-auto"
            onClick={() => {
              handleLike();
            }}
          >
            {likedByUser ? (
              <i class="bi bi-star-fill  text-warning rounded-2"></i>
            ) : (
              <i class="bi bi-star  text-warning  rounded-2"></i>
            )}
          </button>
        </h2>
        <Link to={`/CardInfo/${_id}`}>
          <img
            className="card-img-top"
            src={url}
            alt={alt}
            style={{ height: "13em" }}
          ></img>
        </Link>
        <div className="card-body" style={{ padding: "1em" }}>
          <h4 className="card-title">{title}</h4>
          <h6>{subtitle}</h6>
          <p className="card-text">{description}</p>
          <ul className="list-group list-group ">
            <li className="list-group-item ">{phone}</li>
            <li className="list-group-item">
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              <a href={web}>{web.slice(0,29)}</a>
            </li>

            <li className="list-group-item">
              {state && state + ","} {country && country + ","}{" "}
              {city && city + ","} {street && street + ","}{" "}
              {houseNumber && houseNumber + ","} {zip && zip + "."}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CardCreatedByUser;
