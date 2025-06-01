import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listingOperations } from "../../redux/listing/listing-operations";
import { useListingFilters } from "../../hooks/useListingFilters";
import Container from "../../components/Container/Container";
import ListingCard from "../../components/ListingCard/ListingCard";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./FilteredByQuery.module.scss";

const FilteredByQuery = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { listings, total, query } = useSelector(
    (state) => state.listing.listingData.searchedListingData
  );
  const { loading, error } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  const listingPerPage = 15;

  const pagesNumber = Math.ceil(total / listingPerPage) || 1;

  let pagesArray;

  if (pagesNumber > 1) {
    pagesArray = Array.from({ length: pagesNumber }, (_, i) => i + 1);
  }

  const { setFilters, searchQuery } = useListingFilters();

  useEffect(() => {
    setFilters({ searchQuery: query });
  }, [query, setFilters]);

  useEffect(() => {
    dispatch(
      listingOperations.getSearchedListings({
        query: searchQuery,
        page: currentPage,
        limit: listingPerPage,
      })
    );
  }, [dispatch, currentPage, searchQuery]);

  const changePage = useCallback((selectedPage) => {
    setCurrentPage(selectedPage);
  }, []);

  return (
    <Container>
      <div className={styles.listingListWrapper}>
        {listings?.length ? (
          <ul className={styles.listingList}>
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </ul>
        ) : null}
        <Pagination
          pages={pagesArray}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
};

export default FilteredByQuery;
