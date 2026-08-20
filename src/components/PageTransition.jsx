import { useLocation } from "react-router-dom";

/**
 * Wraps <Routes> so each route change triggers an enter animation.
 * Uses `key={pathname}` to force a fresh mount + CSS @keyframes.
 *
 * Exit animations aren't natively supported without a library like
 * framer-motion, so we use a clean "fade + slide up" entrance that
 * gives the feel of a page transition without jank.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
