import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import RoomList from "../../Rooms/RoomList";
import HotelProfileImg from "../../UI/HotelProfileImg";
import DisplayHotelDescription from "./DisplayHotelDescription";
import ServiceSection from "../../layout/ServiceSection";
import classes from "./HotelDetails.module.css";
import CheckOut from "./CheckOut";
import Currency from "../../Currency/CurrencyStart";
import Review from "../../Reviews/ReviewStart";
import { TimespanContextProvider } from "../../../store/timespan-context";
import { searchActions, searchHotel } from "../../../store/search-slice";
import Weather from "../../Weather/SearchWeather";
import SearchWeather from "../../Weather/SearchWeather";
import Rating from "../../UI/Rating";
import LoadingSpinner from "../../UI/LoadingSpinner";

const HotelDetails = (props) => {
  const loading = useSelector((state) => state.http.loading);
  const locationId = useLocation().pathname.replace("/details/", "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeRoom, setActiveRoom] = useState();
  const hotel = useSelector((state) => state.search.single);

  useEffect(() => {
    if (hotel === null) {
      dispatch(searchActions.storeId({ id: locationId }));
      dispatch(searchHotel());
    }
    if (hotel === undefined) {
      navigate("/404", { replace: true });
    }
  }, [hotel]);

  const handleRoomSelection = (room) => {
    setActiveRoom(room);
  };

  return (
    <>
      {loading && (
        <div className={`${classes.spinnerpos} text-center`}>
          <LoadingSpinner size="large" color="#973b50" />
        </div>
      )}

      {!loading && hotel !== null && hotel !== undefined && (
        <div className={`${classes.details}`}>
          <div className="row">
            <div className={`col-4 ${classes["first-col"]}`}>
              <div className={classes.ratingpos}>
                <Rating rating={hotel.rating} />
              </div>
              <HotelProfileImg url={hotel.url} />
            </div>
            <div className="col-3">
              <DisplayHotelDescription hotel={hotel} />
            </div>
            <div className="col-5">
              <SearchWeather country={hotel.location} city={hotel.city}></SearchWeather>
              <Currency hotellCurr={hotel.nationalcurrency} country={hotel.location}></Currency>
            </div>
          </div>
          <RoomList selectRoom={handleRoomSelection} />
          <TimespanContextProvider>
            <CheckOut room={activeRoom} hotel={hotel} />
          </TimespanContextProvider>
          <Review hotel={hotel}></Review>
        </div>
      )}
    </>
  );
};

export default HotelDetails;
