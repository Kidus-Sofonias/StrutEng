import { useState } from "react";

export default function VideoFacade({ url, title, videoId }) {
  const [playing, setPlaying] = useState(false);
  const [posterSrc, setPosterSrc] = useState(
    videoId ? `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp` : null
  );

  if (playing) {
    return (
      <div className="video">
        <iframe
          src={`${url}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`video video-facade ${posterSrc ? "" : "video-facade--plain"}`}>
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() =>
            setPosterSrc(
              videoId
                ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                : null
            )
          }
        />
      )}
      {!posterSrc && <div className="video-facade-sheen" aria-hidden="true" />}
      <button
        type="button"
        className="video-play-btn"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${title}`}
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </button>
    </div>
  );
}