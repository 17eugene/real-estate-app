import { Route, Routes } from "react-router-dom";
/*---------------------*/
import Home from "./pages/Home/Home";
import Buy from "./pages/Buy/Buy";
import Rent from "./pages/Rent/Rent";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Listing from "./pages/Listing/Listing";
import CreateListing from "./pages/CreateListing/CreateListing";
import EditListing from "./pages/EditListing/EditListing";
import Header from "./components/Header/Header";
/*---------------------*/
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/buy/listing/:listingId" element={<Listing />} />
        <Route path="/rent/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create" element={<CreateListing />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/edit/:listingId" element={<EditListing />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
