import { Link } from "react-router-dom";
import { services } from "../data/services";

// A slowly revolving CSS-3D cube — each face carries one of the six
// service divisions. Hover pauses the spin; the whole stage tilts gently.
export default function Cube3D() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube-stage">
        <div className="cube">
          {services.map((s, i) => (
            <div className="cube-face" key={s.id} style={{ "--face-rot": `${i * 60}deg` }}>
              <Link to={`/services#${s.slug}`} tabIndex={-1}>
                <span className="cube-icon">{s.icon}</span>
                <span className="cube-name">{s.title.split(" & ")[0].split(" Engineering")[0]}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <p className="cube-caption">Six divisions · one revolving team</p>
    </div>
  );
}
