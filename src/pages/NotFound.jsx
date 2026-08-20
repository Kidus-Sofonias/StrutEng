import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";

export default function NotFound() {
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
