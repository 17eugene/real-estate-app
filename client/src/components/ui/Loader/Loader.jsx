import { ThreeDots } from "react-loader-spinner";

const Loader = ({ height, width, radius }) => {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius={radius}
      color="#aabbd4"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default Loader;
