import httpService from "./httpServices";

export const getAllCards = async () => {
  try {
    const response = await httpService.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
    );
    const cardsArray = response;

    return cardsArray;
  } catch (err) {
    console.log("error fetching cards:", err);
    throw err;
  }
};

export const getMyCards = async () => {
  try {
    const response = await httpService.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards "
    );
    const cardsArray = response;

    return cardsArray;
  } catch (err) {
    console.log("error fetching cards:", err);
    throw err;
  }
};
export const getCardById = async (id) => {
  try {
    return await httpService.get(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}
      `
    );
  } catch (err) {
    console.log("error fetching cards:", err);
    throw err;
  }
};

export const createCard = async (card) => {
  httpService.post(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
    card
  );
};

export const deleteCardById = async (id, bizNumber) => {
  httpService.delete(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}  `,
    bizNumber
  );
};

export const likeCard = async (id) => {
  httpService.patch(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
  );
};

export const updateCard = async (id, card) => {
  try {
    return httpService.put(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}
      `,
      card
    );
  } catch (err) {
    console.log("err updating card:", err);
  }
};

const cardServices = {
  getAllCards,
  getMyCards,
  createCard,
  deleteCardById,
  likeCard,
  getCardById,
  updateCard,
};

export default cardServices;
