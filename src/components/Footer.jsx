import { Link } from "react-router-dom";
import { company } from "../data/company";

const PORTFOLIO_URL = "https://kidusstark.vercel.app";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid footer-grid--compact">
        <div>
          <Link to="/" className="brand">
            <img loading="lazy" decoding="async"
              src="/images/logo-transparent.png"
              alt="Strut Engineering home"
              style={{ height: 40, filter: "brightness(1.5)" }}
            />
            <span className="word">
              STRUT ENGINEERING
              <small>PLC · Est. 2015</small>
            </span>
          </Link>
          <p style={{ marginTop: 14, lineHeight: 1.7, fontSize: "0.88rem" }}>
            Engineering solutions for building design since 2015 — structural,
            architectural, infrastructure, industrial and MEP engineering across
            Ethiopia.
          </p>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${company.phoneRaw}`}>{company.phone}</a></li>
            <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li style={{ lineHeight: 1.6, fontSize: "0.88rem" }}>
              {company.address}
              <br />
              {company.city}
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </span>
          <span className="footer-credit footer-credit--em">
            Developed by{" "}
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
              <strong>Kidus Sofonias</strong>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
