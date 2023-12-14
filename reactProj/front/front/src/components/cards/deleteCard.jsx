import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import cardServices from "../../services/cardServices";

export const DeleteCard = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteCard = async (user) => {
      try{

        await cardServices.deleteCardById(id).catch(() => {});
        
        if (user.isBusiness) {
          navigate("/MyCards");
        } else {
          navigate("/");
        }
      }catch(err){
        console.log(err);
      }
    }

    deleteCard(user);
  }, []);
  return;
};
