import { useSelector } from "react-redux";

const Home = () => {
  const { listingData } = useSelector((state) => state.listing);

  return (
    <div>
      {listingData?.length > 0
        ? listingData.map((listing) => (
            <div key={listing._id}>
              <img
                width={250}
                height={160}
                src={listing.photos[0]}
                alt="cover"
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Home;
