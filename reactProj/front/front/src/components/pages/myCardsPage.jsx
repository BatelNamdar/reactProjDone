import PageHeader from "../common/pageHeader";
import cardServices from "../../services/cardServices";
import Card from "../cards/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import CardCreatedByUser from "../cards/cardCreatedByUser";

const MyCardsPage = () => {
  const [cards, setCards] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await cardServices.getMyCards();

        setCards(cardsData.data);
      
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <PageHeader
        title={"My Cards"}
        description="Welcome to your digital Rolodex of success! This is where the magic happens – your very own 'My Cards' page. Your online business cards, all in one place, ready to be shared, edited, and cherished. It's your hub of digital connections and a reflection of your professional identity. Manage, customize, and conquer your networking game right here."
      />
      <br />
      <div className="row">
        <Link to={"/CreateCard"}>Click here to Create New Card</Link>
      </div>
      <div className="row">
        {cards.map((card) => {
          if (card.user_id == user._id) {
            return (
              <div className="col-12 col-md-4">
                <CardCreatedByUser key={card.id} {...card} />
              </div>
            );
          } else {
            return (
              <div className="col-12 col-md-4">
                <Card key={card.id} {...card} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
export default MyCardsPage;
