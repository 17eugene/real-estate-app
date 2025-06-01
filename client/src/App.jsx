import { Route, Routes } from "react-router-dom";
import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
/*---------------------------------------------------------------*/
import { userOperations } from "./redux/user/user-operations";
/*---------------------------------------------------------------*/
import Home from "./pages/Home/Home";
import FilteredByQuery from "./pages/FilteredByQuery/FilteredByQuery";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Messaging from "./pages/Messaging/Messaging";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
/*-----------------------------------------------------------------*/
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
/*------------------------------------------------------------------*/
const Rent = lazy(() => import("./pages/Rent/Rent"));
const Buy = lazy(() => import("./pages/Buy/Buy"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ListingPage = lazy(() => import("./pages/ListingPage/ListingPage"));
const CreateListing = lazy(() => import("./pages/CreateListing/CreateListing"));
const EditListing = lazy(() => import("./pages/EditListing/EditListing"));

const libraries = ["places", "geocoding", "marker"];

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = () => {
      dispatch(userOperations.getCurrentUser());
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/search" element={<FilteredByQuery />} />
          <Route element={<PrivateRoute />}>
            <Route path="/messages" element={<Messaging />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/buy/listing/:listingId"
            element={<ListingPage isLoaded={isLoaded} />}
          />
          <Route
            path="/rent/listing/:listingId"
            element={<ListingPage isLoaded={isLoaded} />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/create" element={<CreateListing />} />
          </Route>
          <Route
            path="/search/listing/:listingId"
            element={<ListingPage isLoaded={isLoaded} />}
          />
          <Route
            path="/listing/:listingId"
            element={<ListingPage isLoaded={isLoaded} />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/edit/:listingId" element={<EditListing />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
