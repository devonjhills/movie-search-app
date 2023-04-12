import { useEffect } from "react";
import { useLocation } from "react-router";

// reference: https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
