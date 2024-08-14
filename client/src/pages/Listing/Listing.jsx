import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/*-------------------------------------*/
import { listingOperations } from "../../redux/listing/listing-operations";
/*-------------------------------------*/
import { currencyFormatting } from "../../utils/currencyFormatting";
/*-------------------------------------*/
import Container from "../../components/Container/Container";
import ListingSwiper from "../../components/ListingSwiper/ListingSwiper";
/*-------------------------------------*/
import { IoLocation } from "react-icons/io5";
import { FaDog } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
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
import styles from "./Listing.module.scss";

/*---------------------------------------------------------------------------*/

function Listing() {
  const [isOpenedSwiper, setIsOpenedSwiper] = useState(false);

  const dispatch = useDispatch();

  const { listingId } = useParams();

  const { currentListing } = useSelector((state) => state.listing);

  useEffect(() => {
    const getCurrentListing = () => {
      dispatch(listingOperations.getListing(listingId));
    };

    getCurrentListing();
  }, [listingId, dispatch]);

  return (
    <>
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
          currentListing.photos.map((photoURL, index) => (
            <SwiperSlide key={index}>
              <img
                width="100%"
                height="500px"
                src={photoURL}
                alt=""
                loading="lazy"
                className={styles.listingImage}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Container>
        <div className={styles.listingDetailsWrapper}>
          <p>
            {currentListing?.name} - {currencyFormatting(currentListing?.price)}
          </p>

          <div className={styles.location}>
            <IoLocation />
            <p>{currentListing?.address}</p>
          </div>

          <div>
            <span>For {currentListing?.type}</span>
          </div>

          <p>{currentListing?.description}</p>

          <div className={styles.optionsWrapper}>
            {currentListing?.["pets allowed"] ? (
              <div>
                <FaDog className={styles.optionIcon} />
                <p>pets allowed</p>
              </div>
            ) : null}

            {currentListing?.furnished ? (
              <div>
                <MdChair className={styles.optionIcon} />
                <p>furnished</p>
              </div>
            ) : null}

            <div>
              <IoBedSharp className={styles.optionIcon} />
              <p>{currentListing?.bedrooms}</p>
            </div>
          </div>
        </div>
      </Container>

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

export default Listing;
