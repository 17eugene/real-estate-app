import { useRef, useEffect } from "react";

const useClickOutside = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
