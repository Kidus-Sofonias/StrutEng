import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page Not Found");
  return (
    <>
      <HeroBanner
        compact
        eyebrow="Error 404"
        title="Page not"
        accent="found"
        description="The page you're looking for doesn't exist — but our engineering does."
        showScroll={false}
        actions={
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        }
      />
    </>
  );
}
