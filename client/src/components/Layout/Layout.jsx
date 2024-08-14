import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterSection from "../FilterSection/FilterSection";
import { Link } from "react-router-dom";
import { listingOperations } from "../../redux/listing/listing-operations";
import { currencyFormatting } from "../../utils/currencyFormatting";
import { IoLocation } from "react-icons/io5";
import styles from "./Layout.module.scss";

const Layout = ({ type }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { listingData } = useSelector((state) => state.listing);
  const { totalListings } = useSelector((state) => state.listing);

  const dispatch = useDispatch();

  const listingPerPage = 15;

  const pagesNumber = Math.ceil(totalListings / listingPerPage) || 1;

  useEffect(() => {
    dispatch(
      listingOperations.getAll({
        page: currentPage,
        limit: listingPerPage,
        type: type,
        filterQueries: {
          price: [],
          furnished: null,
          pets: null,
          bedrooms: null,
        },
      })
    );
  }, [dispatch, currentPage, listingPerPage, type]);

  let pagesArray;

  if (pagesNumber > 1) {
    pagesArray = Array.from({ length: pagesNumber }, (_, i) => i + 1);
  }

  function changePage(selectedPage) {
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <FilterSection />
      <main>
        <ul className={styles.listingList}>
          {listingData?.length > 0
            ? listingData.map((listing) => (
                <li key={listing._id} className={styles.listingItem}>
                  <Link to={`listing/${listing._id}`}>
                    <img src={listing.photos[0]} alt="cover" />
                    <div>
                      <p>For {listing.type}</p>
                      <p>{listing.name}</p>
                      <p>
                        <IoLocation /> {listing.address}
                      </p>
                      <p>{currencyFormatting(listing.price)}</p>
                    </div>
                  </Link>
                </li>
              ))
            : null}
        </ul>
        <div className={styles.pagination}>
          {pagesArray?.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => changePage(page)}
              className={
                currentPage === page
                  ? `${styles.pageButton} ${styles.active}`
                  : styles.pageButton
              }
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

export default Layout;
