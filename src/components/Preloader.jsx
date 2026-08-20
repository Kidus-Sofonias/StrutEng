import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer;
    const finish = () => setDone(true);
    if (document.readyState === "complete") {
      timer = setTimeout(finish, 1200);
    } else {
      window.addEventListener("load", finish);
      timer = setTimeout(finish, 3000);
    }
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), 700);
    return () => clearTimeout(t);
  }, [done]);

  if (hidden) return null;

  return (
    <div className={`preloader ${done ? "preloader-done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <img
          src="/images/logo-full.png"
          alt="Strut Engineering"
          className="preloader-logo"
        />
        <div className="preloader-bar">
          <span className={done ? "preloader-fill full" : "preloader-fill"} />
        </div>
        <p className="preloader-tag">Engineering Excellence Since 2015</p>
      </div>
    </div>
  );
}
