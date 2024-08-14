import { useState } from "react";
import Backdrop from "../ui/Backdrop/Backdrop";
import { GrClose } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { createPortal } from "react-dom";
import {
  Navigation,
  Pagination,
  EffectFade,
  Keyboard,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ListingSwiper.scss";

function ListingSwiper({ isOpenedSwiper, photos, setIsOpenedSwiper }) {
  const modalRoot = document.querySelector("#modal-root");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function onButtonCloseHandler() {
    setIsOpenedSwiper(false);
  }

  return createPortal(
    <Backdrop isOpenedSwiper={isOpenedSwiper}>
      <div className="swiperWindow">
        <div className="closeBtn" onClick={onButtonCloseHandler}>
          <GrClose />
        </div>
        <Swiper
          style={{
            "--swiper-navigation-color": "#2bb",
            "--swiper-pagination-color": "#2bb",
            "--swiper-pagination-bullet-width": "12px",
            "--swiper-pagination-bullet-height": "12px",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-inactive-opacity": "0.3",
            "--swiper-pagination-bullet-inactive-width": "6px",
          }}
          modules={[
            Navigation,
            Pagination,
            EffectFade,
            Keyboard,
            Thumbs,
            FreeMode,
          ]}
          loop={true}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          effect="fade"
          lazy="true"
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation={true}
          slidesPerView={1}
          className="mainSwiper"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                src={photo}
                alt=""
                width="100%"
                height="450"
                loading="lazy"
                className="largePhoto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="previewSwiper">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  src={photo}
                  alt=""
                  width="100%"
                  height="130"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Backdrop>,
    modalRoot
  );
}

export default ListingSwiper;
