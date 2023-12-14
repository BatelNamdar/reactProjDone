import { useEffect, useState } from "react";
import cardsService from "../services/cardServices";

export const useCard = (id) => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await cardsService.getCardById(id);
        setCard(data);
      } catch (error) {
        setError(error);
      }
    };

    if (id) {
      getCard();
    }
  }, [id]);

  return { card, error };
};
