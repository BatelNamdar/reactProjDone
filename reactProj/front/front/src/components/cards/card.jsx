import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useState } from "react";
import cardServices from "../../services/cardServices";

const Card = ({
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
  notify,
}) => {
  const { state, country, city, street, houseNumber, zip } = address;
  const { url, alt } = image;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likedByUser, setLikedByUser] = useState(likes.includes(user?._id));

  const handleLike = async () => {
    if (user) {
      await cardServices.likeCard(_id);
      setLikedByUser(!likedByUser);
    } else {
      alert("you must Sign In");
      navigate("/SignIn");
    }
  };

  return (
    <>
      <div className="card m-3 h-100 border-4 ">
        <h2 className="d-flex space-between">
          <button
            className="ms-auto bg-none border"
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
            style={{ height: "12rem" }}
          ></img>
        </Link>
        <div className="card-body" style={{ padding: "1em" }}>
          <h4 className="card-title">{title}</h4>
          <h6>{subtitle}</h6>
          <p className="card-text">{description}</p>
          <ul className="list-group list-group ">
            <p>{phone}</p>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              <a href={web}>{web.slice(0, 29)}</a>
            </p>

            <p>
              {state && state + ","} {country && country + ","}{" "}
              {city && city + ","} {street && street + ","}{" "}
              {houseNumber && houseNumber + ","} {zip && zip + "."}
            </p>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
