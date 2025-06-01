import { Link } from "react-router-dom";
/*------------------------------------------------*/
import { currencyFormatting } from "../../utils/currencyFormatting";
/*------------------------------------------------*/
import ListingTypeLabel from "../ui/ListingTypeLabel/ListingTypeLabel";
/*------------------------------------------------*/
import { IoLocation, IoBedSharp } from "react-icons/io5";
import { FaDog } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { RiParkingFill } from "react-icons/ri";
import { FaRoadBarrier } from "react-icons/fa6";
import { RxRulerSquare } from "react-icons/rx";
import { BsBuildingsFill } from "react-icons/bs";

/*------------------------------------------------*/
import styles from "./ListingCard.module.scss";

const ListingCard = ({ listing }) => {
  return (
    <li key={listing._id} className={styles.listingItem}>
      <Link to={`listing/${listing._id}`}>
        <div className={styles.imageCoverWrapper}>
          <img src={listing.photos[0].url} alt="cover" />
        </div>
        <div>
          <div className={styles.listingTypeWrapper}>
            <ListingTypeLabel listingType={listing.type} />
          </div>
          <div className={styles.locationWrapper}>
            <IoLocation /> {listing.address}
            <p>
              {listing?.settlement}, {listing?.street}, {listing?.houseNumber}
            </p>
          </div>
          <ul className={styles.iconsList}>
            {listing.bedrooms ? (
              <li>
                <div>
                  <IoBedSharp />{" "}
                  <span>
                    {listing.bedrooms}{" "}
                    {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                  </span>
                </div>
              </li>
            ) : null}

            {listing.furnished ? (
              <li>
                <div>
                  <MdChair /> <span>Furnished</span>
                </div>
              </li>
            ) : null}

            {listing.parking ? (
              <li>
                <div>
                  <RiParkingFill /> <span>Parking</span>
                </div>
              </li>
            ) : null}

            {listing.petsAllowed ? (
              <li>
                <div>
                  <FaDog /> <span>Pets allowed</span>
                </div>
              </li>
            ) : null}

            {listing.gatedCommunity ? (
              <li>
                <div>
                  <FaRoadBarrier /> <span>Gated community</span>
                </div>
              </li>
            ) : null}

            {listing.squareMeters ? (
              <li>
                <div>
                  <RxRulerSquare />
                  <span>{listing.squareMeters} sq. meters</span>
                </div>
              </li>
            ) : null}
            {listing.floor ? (
              <li>
                <div>
                  <BsBuildingsFill /> <span>Floor {listing.floor}</span>
                </div>
              </li>
            ) : null}
          </ul>
          <span className={styles.price}>
            {currencyFormatting(listing.price)}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ListingCard;
