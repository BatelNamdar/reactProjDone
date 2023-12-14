import NavBar from "./components/common/navBar";
import Footer from "./components/common/footer";
import { Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/homePage";
import AboutPage from "./components/pages/aboutPage";
import MyCardsPage from "./components/pages/myCardsPage";
import SignUpPage from "./components/pages/signUpPage";
import SignUpBiz from "./components/pages/signUpBiz";
import SignInPage from "./components/pages/signInPage";
import ProtectedRoute from "./components/common/protectedRoute";

import { LogOut } from "./components/common/logout";
import { CreateCard } from "./components/cards/createCard";
import { DeleteCard } from "./components/cards/deleteCard";
import { EditCard } from "./components/cards/editCard";
import FavoritePage from "./components/pages/favoritePage";
import { EditWait } from "./components/cards/EditWait";
import CardInfo from "./components/common/cardInfo";

import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { EditUser } from "./components/common/editUser";

const notifyLike = () => {
  toast("You Have To Be Signed-in In Order To Like Card");
};

function App() {
  return (
    <>
      <div className="App d-flex flex-column min-vh-100">
        <header className="">
          <NavBar />
        </header>
        <main className="flex-fill container">
          <div className="">
            <Routes>
              <Route path="/" element={<HomePage notify={notifyLike} />} />

              <Route path="/About" element={<AboutPage />} />

              {/* routes for signing in, up and out  */}

              <Route path="/SignIn" element={<SignInPage redirect={"/"} />} />

              <Route
                path="/SignUp"
                element={<SignUpPage redirect={"/SignIn"} />}
              />

              <Route path="/SignUpBiz" element={<SignUpBiz />} />

              <Route path="Logout" element={<LogOut />} />
              <Route path="/EditUser" element={<EditUser />} />

              {/* routes for cards */}
              <Route path="/CardInfo/:id" element={<CardInfo />} />
              <Route
                path="/Mycards"
                element={
                  <ProtectedRoute onlybiz>
                    <MyCardsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Mycards/delete/:id"
                element={
                  <ProtectedRoute onlybiz>
                    <DeleteCard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Mycards/edit/:id"
                element={
                  <ProtectedRoute onlybiz>
                    <EditCard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/CreateCard"
                element={
                  <ProtectedRoute onlybiz>
                    <CreateCard />
                  </ProtectedRoute>
                }
              />
              <Route path="/Favorite" element={<FavoritePage />} />
            </Routes>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
