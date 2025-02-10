import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/home/Home";
import YourPlannedTrip from "../pages/YourTrip/YourPlannedTrip";
import TravelMitraPlaces from "../pages/TravelMitraPlaces";
import CategoryPage from "../pages/category/CategoryPages";
import EventSection from "../pages/event/EventSection";
import IconicSection from "../pages/iconic/IconicSection";
import HiddenGems from "../pages/hidden/HiddenGems";
import GemsDetails from "../pages/hidden/GemsDetails";
import Fact from "../pages/facts/Fact";
import AboutPage from "../pages/about/AboutPage";
import Festival from "../pages/fest/Festival";
import Hotels from "../pages/Hotels";
import Booking from "../pages/Booking";
import CalendarView from "../pages/calender/CalendarView";
import FetchBookingDetails from "../pages/FetchBookingDetails";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/category", element: <CategoryPage /> },            
            { path: "/travel-mitra-trips", element: <TravelMitraPlaces /> },
            { path: "/planedtrip", element: <YourPlannedTrip /> },
            { path: "/events", element: <EventSection /> },
            { path: "/iconic", element: <IconicSection /> },
            { path: "/hidden", element: <HiddenGems /> },
            { path: "/details", element: <GemsDetails /> },
            { path: "/fact", element: <Fact /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/fest", element: <Festival /> },
            { path: "/hotel", element: <Hotels /> },
            { path: "/booking/:hotelId", element: <Booking /> },
            { path: "/calendar", element: <CalendarView /> },
            { path: "/fetchBookingDetails", element: <FetchBookingDetails/> },
        ],
    },
]);

export default router;