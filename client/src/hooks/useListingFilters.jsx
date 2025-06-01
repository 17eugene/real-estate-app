import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useListingFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const priceRange = {
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    exactPrice: searchParams.get("exactPrice"),
  };
  const bedrooms = searchParams.get("bedrooms");
  const moreFilters = {
    petsAllowed: searchParams.get("petsAllowed"),
    furnished: searchParams.get("furnished"),
    parking: searchParams.get("parking"),
  };
  const searchQuery = searchParams.get("searchQuery");

  const setFilters = useCallback(
    (filter) => {
      setSearchParams((params) => {
        if (filter.bedrooms && filter.bedrooms !== "any") {
          params.set("bedrooms", filter.bedrooms);
        } else if (filter.bedrooms === null || filter.bedrooms === "any") {
          params.delete("bedrooms");
        }

        if (filter.minPrice) {
          params.set("minPrice", filter.minPrice);
        } else if (filter.minPrice === null) {
          params.delete("minPrice");
        }

        if (filter.maxPrice) {
          params.set("maxPrice", filter.maxPrice);
        } else if (filter.maxPrice === null) {
          params.delete("maxPrice");
        }

        if (filter.exactPrice) {
          params.set("exactPrice", filter.exactPrice);
        } else if (filter.exactPrice === null) {
          params.delete("exactPrice");
        }

        if (filter.petsAllowed) {
          params.set("petsAllowed", filter.petsAllowed);
        } else if (
          filter.petsAllowed === false ||
          filter.petsAllowed === "false"
        ) {
          params.delete("petsAllowed");
        }

        if (filter.furnished) {
          params.set("furnished", filter.furnished);
        } else if (filter.furnished === false || filter.furnished === "false") {
          params.delete("furnished");
        }

        if (filter.parking) {
          params.set("parking", filter.parking);
        } else if (filter.parking === false || filter.parking === "false") {
          params.delete("parking");
        }

        if (filter.searchQuery) {
          params.set("searchQuery", filter.searchQuery);
        }

        return params;
      });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    for (const key of searchParams.keys()) {
      setSearchParams((params) => {
        params.delete(key);
      });
    }
  }, [searchParams, setSearchParams]);

  return {
    bedrooms,
    priceRange,
    moreFilters,
    searchQuery,
    setFilters,
    resetFilters,
  };
}
