import { useEffect } from "react";
import { useRef } from "react";

const useOutsideClick = (cb) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  return ref;
};

export default useOutsideClick;
