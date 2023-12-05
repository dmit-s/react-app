import React, { useEffect, useRef, useState } from "react";

const useDynamicSVGImport = (iconName) => {
  const importedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  console.log(iconName);
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        console.log(123);
        importedIconRef.current = (
          await import(`../assets/icons/vite.svg?react`)
        ).default;

            
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
        console.log(importedIconRef);
      }
    };

    importIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
};

export default useDynamicSVGImport;
