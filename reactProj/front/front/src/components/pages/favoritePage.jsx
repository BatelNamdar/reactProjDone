import { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";
import Card from "../cards/card";
import CardCreatedByUser from "../cards/cardCreatedByUser";
import { useAuth } from "../../context/auth.context";
import cardServices from "../../services/cardServices";
import { useNavigate } from "react-router-dom";

const FavoritePage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  const { user } = useAuth();

  if (!user) {
    navigate("/SignUp");
  }
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await cardServices.getAllCards();
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
        title={"Favorites "}
        description="Welcome to your personal hall of fame! This is where your most cherished digital connections reside. Your favorite cards, your VIPs, your digital A-list. Swipe, click, and revel in the brilliance of your top connections. Because in this corner of the digital universe, your favorites always take center stage. Let the networking showcase begin!"
      />

      <div className="row">
        {cards.map((card) => {
          if (user) {
            if (card.likes.includes(user?._id)) {
              if (card.user_id == user?._id) {
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
            } else {
              return;
            }
          } else {
            navigate("/");
          }
        })}
      </div>
    </>
  );
};

export default FavoritePage;
