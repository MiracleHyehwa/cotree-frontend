import { useEffect, useState } from "react";

export const useDelayedUnmount = (shouldShow: boolean, delay = 1000): boolean => {
  const [shouldRender, setShouldRender] = useState(shouldShow);

  useEffect(() => {
    if (shouldShow) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, delay]);

  return shouldRender;
};
