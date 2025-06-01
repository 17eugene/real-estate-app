import { useEffect, useState } from "react";
/*----------------------------------------------- */
import { useSelector, useDispatch } from "react-redux";
import { listingOperations } from "../../redux/listing/listing-operations";
/*----------------------------------------------- */
import { useListingFilters } from "../../hooks/useListingFilters";
/*----------------------------------------------- */
import Container from "../Container/Container";
import FilterSection from "../FilterSection/FilterSection";
import ListingCard from "../ListingCard/ListingCard";
import Pagination from "../Pagination/Pagination";
/*----------------------------------------------- */
import { LuFilter } from "react-icons/lu";
/*----------------------------------------------- */
import styles from "./Layout.module.scss";

const Layout = ({ type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenedFilterSection, setIsOpenedFilterSection] = useState(false);

  const { priceRange, bedrooms, moreFilters } = useListingFilters();

  const { listings, totalListings } = useSelector(
    (state) => state.listing.listingData
  );

  const dispatch = useDispatch();

  const listingsPerPage = 15;

  const pagesNumber = Math.ceil(totalListings / listingsPerPage) || 1;

  useEffect(() => {
    dispatch(
      listingOperations.getAll({
        page: currentPage,
        limit: listingsPerPage,
        type: type,
        filterQueries: {
          minPrice: priceRange?.minPrice,
          maxPrice: priceRange?.maxPrice,
          exactPrice: priceRange?.exactPrice,
          furnished: moreFilters?.furnished,
          petsAllowed: moreFilters?.petsAllowed,
          parking: moreFilters?.parking,
          bedrooms: encodeURIComponent(bedrooms),
        },
      })
    );
  }, [
    dispatch,
    currentPage,
    listingsPerPage,
    type,
    bedrooms,
    priceRange.minPrice,
    priceRange.maxPrice,
    priceRange.exactPrice,
    moreFilters.furnished,
    moreFilters.petsAllowed,
    moreFilters.parking,
  ]);

  let pagesArray;

  if (pagesNumber > 1) {
    pagesArray = Array.from({ length: pagesNumber }, (_, i) => i + 1);
  }

  function changePage(selectedPage) {
    setCurrentPage(selectedPage);
  }

  function toggleFilterSection() {
    setIsOpenedFilterSection(!isOpenedFilterSection);
  }

  return (
    <>
      <FilterSection
        isOpenedFilterSection={isOpenedFilterSection}
        toggleFilterSection={toggleFilterSection}
      />
      <Container>
        <div className={styles.filterIconWrapper} onClick={toggleFilterSection}>
          <LuFilter className={styles.filterIcon} />
        </div>
        <div className={styles.listingListWrapper}>
          <ul className={styles.listingList}>
            {listings?.length > 0
              ? listings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))
              : null}
          </ul>
          <Pagination
            pages={pagesArray}
            changePage={changePage}
            currentPage={currentPage}
          />
        </div>
      </Container>
    </>
  );
};

export default Layout;
