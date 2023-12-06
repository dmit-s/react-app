import React, { useEffect, useRef, useState } from "react";

const useDynamicSVGImport = (iconName) => {
  const importedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        importedIconRef.current = (
          await import(`../assets/icons/${iconName}.svg?react`)
        ).default;
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    importIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
};

export default useDynamicSVGImport;
