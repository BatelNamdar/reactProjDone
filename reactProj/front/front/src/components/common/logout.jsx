import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import PageHeader from "./pageHeader";
import { useEffect } from "react";

export const LogOut = ({ redirect = "/" }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate(redirect);
  }, [redirect, navigate, logout]);

  return (
    <>
      <PageHeader
        title="loggin out..."
        description="If you're seeing this, you're not supposed to! Don't panic; you're in the process of being swiftly redirected. If that doesn't happen in a blink, feel free to give fate a little nudge by pressing the logo. Thanks for stopping by, and remember, the digital door is always open when you want to return!"
      />
    </>
  );
};
