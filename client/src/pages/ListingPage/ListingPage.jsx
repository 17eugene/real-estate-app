import { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSocketContext } from "../../context/SocketContext";
/*-------------------------------------*/
import { listingOperations } from "../../redux/listing/listing-operations";
import { chatOperations } from "../../redux/chat/chat-operations";
/*-------------------------------------*/
import { currencyFormatting } from "../../utils/currencyFormatting";
/*-------------------------------------*/
import Container from "../../components/Container/Container";
import ListingSwiper from "../../components/ListingSwiper/ListingSwiper";
import ListingAuthorInfo from "../../components/ListingAuthorInfo/ListingAuthorInfo";
import Map from "../../components/Map/Map";
import ListingTypeLabel from "../../components/ui/ListingTypeLabel/ListingTypeLabel";
/*-------------------------------------*/
import { IoLocation } from "react-icons/io5";
/*-------------------------------------*/
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectFade,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
/*-------------------------------------*/
import styles from "./ListingPage.module.scss";
/*---------------------------------------------------------------------------*/
const Sidebar = lazy(() => import("../../components/Sidebar/Sidebar"));
const Backdrop = lazy(() => import("../../components/ui/Backdrop/Backdrop"));
const ChatWindow = lazy(() => import("../../components/ChatWindow/ChatWindow"));

function ListingPage({ isLoaded }) {
  const [isOpenedSwiper, setIsOpenedSwiper] = useState(false);
  const [isOpenedChat, setIsOpenedChat] = useState(false);
  const [isOpenedSidebar, setIsOpenedSidebar] = useState(false);

  const dispatch = useDispatch();

  const { listingId } = useParams();

  const listingOwnerId = useSelector(
    (state) => state.listing?.listingData.currentListing?.owner?._id
  );
  const { currentListing } = useSelector((state) => state.listing.listingData);
  const { room } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user?.userData?._id);

  const { socket } = useSocketContext();

  useEffect(() => {
    const getCurrentListing = () => {
      dispatch(listingOperations.getListing(listingId));
    };

    getCurrentListing();
  }, [listingId, dispatch]);

  useEffect(() => {
    if (listingOwnerId && currentUser) {
      dispatch(
        chatOperations.getChatRoom({ owner: listingOwnerId, listingId })
      );
    }
  }, [listingOwnerId, listingId, currentUser, dispatch]);

  const toggleSidebar = () => {
    setIsOpenedSidebar(!isOpenedSidebar);
  };

  return (
    <>
      <Backdrop isOpenedSidebar={isOpenedSidebar}>
        <Sidebar
          toggleSidebar={toggleSidebar}
          isOpenedSidebar={isOpenedSidebar}
          authorId={listingOwnerId}
        />
      </Backdrop>
      <Swiper
        onClick={() => setIsOpenedSwiper(true)}
        modules={[Navigation, Pagination, EffectFade, Keyboard, Autoplay]}
        effect="fade"
        autoplay={{ delay: 10_000, disableOnInteraction: false }}
        lazy="true"
        spaceBetween={null}
        slidesPerView={1}
      >
        {currentListing?.photos?.length &&
          currentListing.photos.map((photo, index) => (
            <SwiperSlide key={photo._id || index}>
              <img
                // width="100%"
                // height="500px"
                src={photo.url}
                alt=""
                loading="lazy"
                className={styles.listingImage}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Container>
        <div className={styles.listingContent}>
          <div className={styles.listingDetailsWrapper}>
            <ul className={styles.optionsList}>
              {currentListing?.floor ? (
                <li>
                  <p>Floor: {currentListing.floor}</p>
                </li>
              ) : null}

              {currentListing?.squareMeters ? (
                <li>
                  <p>
                    {currentListing.squareMeters}{" "}
                    <span className={styles.m}>m</span>
                  </p>
                </li>
              ) : null}

              {currentListing?.bedrooms ? (
                <li>
                  <p>Bedrooms: {currentListing.bedrooms}</p>
                </li>
              ) : null}

              {currentListing?.petsAllowed ? (
                <li>
                  <p>pets allowed</p>
                </li>
              ) : null}

              {currentListing?.furnished ? (
                <li>
                  <p>furnished</p>
                </li>
              ) : null}

              {currentListing?.parking ? (
                <li>
                  <p>parking</p>
                </li>
              ) : null}

              {currentListing?.gatedCommunity ? (
                <li>
                  <p>Gated Community</p>
                </li>
              ) : null}
            </ul>

            {currentListing?.settlement ? (
              <div className={styles.listingName}>
                <p>
                  {currentListing?.settlement}, {currentListing?.street}
                  {currentListing?.houseNumber && (
                    <span>, {currentListing.houseNumber}</span>
                  )}
                  <span>
                    {""} - {currencyFormatting(currentListing?.price)}
                  </span>
                </p>
              </div>
            ) : null}

            {currentListing?.region ? (
              <div className={styles.location}>
                <IoLocation />
                <p>
                  <span>{currentListing?.region} область</span>
                </p>
              </div>
            ) : null}

            <div className={styles.listingTypeWrapper}>
              <ListingTypeLabel listingType={currentListing?.type} />
            </div>

            <p className={styles.listingDescr}>{currentListing?.description}</p>
          </div>

          <ListingAuthorInfo
            setIsOpenedChat={setIsOpenedChat}
            listingId={listingId}
            toggleSidebar={toggleSidebar}
          />

          {isOpenedChat ? (
            <Backdrop isOpenedChat={isOpenedChat}>
              <ChatWindow
                setIsOpenedChat={setIsOpenedChat}
                room={room}
                socket={socket}
                chatWith={[
                  currentListing?.owner?.username,
                  currentListing?.owner?.avatar,
                ]}
              />
            </Backdrop>
          ) : null}
        </div>
      </Container>

      {isLoaded && (
        <div className={styles.mapWrapper}>
          <Map position={currentListing?.coordinates} />
        </div>
      )}

      {isOpenedSwiper && (
        <ListingSwiper
          photos={currentListing?.photos}
          isOpenedSwiper={isOpenedSwiper}
          setIsOpenedSwiper={setIsOpenedSwiper}
        />
      )}
    </>
  );
}

export default ListingPage;
