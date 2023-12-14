import PageHeader from "../common/pageHeader";
import { useState, useEffect } from "react";
import cardServices from "../../services/cardServices";
import Card from "../cards/card";
import { useAuth } from "../../context/auth.context";
import CardCreatedByUser from "../cards/cardCreatedByUser";

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();

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
        title="Home"
        description="Welcome to the virtual hub of creativity and connections! Dive into the world of online business cards, where your identity meets innovation. Discover a new way to leave your mark and network like never before. Create, connect, and conquer with our digital business cards."
      />

      <div className="row">
        <h3>
          need some inspo? check out these cards, made by fellow business folks
          like you.
        </h3>
        <h5>pss.... yours can be on here too :)</h5>
        {cards.map((card) => {
          if (user) {
            if (card.user_id == user?._id) {
              return (
                <div className="col-12 col-sm-4 mb-2 ">
                  <CardCreatedByUser key={card.id} {...card} />
                </div>
              );
            } else {
              return (
                <div className="col-12 col-md-4 mb-2">
                  <Card key={card.id} {...card} />
                </div>
              );
            }
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

export default HomePage;
