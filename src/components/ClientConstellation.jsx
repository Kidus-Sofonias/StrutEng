import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useReducedMotion from "../hooks/useReducedMotion";
import { getClientProjects } from "../data/clients";
import { projectMedia } from "../data/media";

/**
 * ClientConstellation
 * Desktop: canvas with connected nodes — click to open a project panel.
 * Mobile: responsive CSS grid — tap to open.
 */
export default function ClientConstellation({ clients }) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selected, setSelected] = useState(null); // client name or null
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: "" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = (w) => setIsMobile(w < 768);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) check(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selectClient = useCallback((name) => {
    setSelected((prev) => (prev === name ? null : name));
  }, []);

  const closePanel = useCallback(() => setSelected(null), []);

  const projects = selected ? getClientProjects(selected) : [];

  return (
    <div className="constellation-wrap">
      {/* ── Client Nodes ── */}
      {reduced || isMobile ? (
        <div className="constellation-grid" ref={containerRef}>
          {clients.map((c, i) => (
            <button
              key={`cg-${i}`}
              className={`constellation-grid-item ${selected === c ? "active" : ""}`}
              onClick={() => selectClient(c)}
            >
              <span className="constellation-grid-dot" />
              <span className="constellation-grid-name">{c}</span>
              {getClientProjects(c).length > 0 && (
                <span className="constellation-grid-count">
                  {getClientProjects(c).length}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <CanvasConstellation
          clients={clients}
          tooltip={tooltip}
          setTooltip={setTooltip}
          containerRef={containerRef}
          canvasRef={canvasRef}
          onSelect={selectClient}
          selected={selected}
        />
      )}

      {/* ── Project Panel ── */}
      {selected && (
        <div className={`client-panel ${projects.length ? "open" : "open empty"}`}>
          <div className="client-panel-header">
            <div>
              <h3>{selected}</h3>
              <span className="client-panel-count">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </span>
            </div>
            <button className="client-panel-close" onClick={closePanel}>
              ✕
            </button>
          </div>
          <div className="client-panel-body">
            {projects.length === 0 ? (
              <p className="client-panel-empty">
                Project details coming soon.
              </p>
            ) : (
              <div className="client-panel-grid">
                {projects.map((p) => {
                  const imgs = projectMedia(p, 0, p.category?.id || "structural");
                  const img1 = imgs[0];
                  return (
                    <Link
                      to={`/projects/${p.slug}`}
                      className="client-panel-card"
                      key={p.slug}
                    >
                      <div className="client-panel-card-img">
                        <img src={img1.src} alt={img1.alt} loading="lazy" />
                      </div>
                      <div className="client-panel-card-copy">
                        <span className={`status ${p.status.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}>
                          {p.status}
                        </span>
                        <h4>{p.name}</h4>
                        <span className="client-panel-card-meta">
                          {p.location}
                          {p.category && ` · ${p.category.title}`}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Canvas rendering (desktop) ── */
function CanvasConstellation({ clients, tooltip, setTooltip, containerRef, canvasRef, onSelect, selected }) {
  const nodesRef = useRef([]);
  const colsRef = useRef(4);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouseX = -1000;
    let mouseY = -1000;
    let W, H;
    let hoveredNode = null;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      initNodes();
    };

    const initNodes = () => {
      const padding = 80;
      const cols = Math.ceil(Math.sqrt(clients.length * (W / H)));
      colsRef.current = cols;
      const rows = Math.ceil(clients.length / cols);
      const cellW = (W - padding * 2) / cols;
      const cellH = (H - padding * 2) / rows;

      nodesRef.current = clients.map((name, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const jitterX = (Math.random() - 0.5) * cellW * 0.35;
        const jitterY = (Math.random() - 0.5) * cellH * 0.35;
        const bx = padding + col * cellW + cellW / 2 + jitterX;
        const by = padding + row * cellH + cellH / 2 + jitterY;
        return { name, baseX: bx, baseY: by, x: bx, y: by, radius: 5 + Math.random() * 4 };
      });
    };

    resize();

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onClick = (e) => {
      if (hoveredNode) {
        onSelect(hoveredNode.name);
      }
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      hoveredNode = null;
      setTooltip((t) => ({ ...t, visible: false }));
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("click", onClick);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const now = Date.now();
      const nodes = nodesRef.current;
      const wScale = Math.max(0.9, Math.min(1.5, W / 1200));
      const baseFontSize = Math.round(14 * wScale);
      const hoverFontSize = Math.round(16 * wScale);

      for (const n of nodes) {
        n.x = n.baseX + Math.sin(now * 0.0003 + n.baseX * 0.01) * 5;
        n.y = n.baseY + Math.cos(now * 0.0004 + n.baseY * 0.01) * 4;
      }

      // Connections
      const maxDist = 160 * wScale;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139,26,26,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Nodes + labels
      hoveredNode = null;
      for (const n of nodes) {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = dist < 50;
        const isSelected = selected === n.name;
        if (isHovered) hoveredNode = n;

        const r = isHovered ? n.radius * 1.6 : isSelected ? n.radius * 1.3 : n.radius;

        // Glow
        if (isHovered || isSelected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 16, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? "rgba(196,148,58,0.25)" : "rgba(196,148,58,0.18)";
          ctx.fill();
        }

        // Dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? "rgba(196,148,58,1)"
          : isHovered
          ? "rgba(139,26,26,1)"
          : "rgba(139,26,26,0.7)";
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered || isSelected
          ? "rgba(196,148,58,0.7)"
          : "rgba(139,26,26,0.12)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Label
        const fontSize = isHovered ? hoverFontSize : baseFontSize;
        const fontWeight = isHovered || isSelected ? "700" : "600";
        ctx.font = `${fontWeight} ${fontSize}px "DM Sans", sans-serif`;
        ctx.textAlign = "center";

        const lx = n.x;
        const ly = n.y + r + 18 * wScale;

        const words = n.name.split(" ");
        const lines = [];
        const maxLineW = W / colsRef.current * 0.85;

        if (ctx.measureText(n.name).width < maxLineW || words.length === 1) {
          lines.push(n.name);
        } else {
          const mid = Math.ceil(words.length / 2);
          lines.push(words.slice(0, mid).join(" "));
          lines.push(words.slice(mid).join(" "));
        }

        const lineH = fontSize + 4;
        const totalH = lineH * lines.length + 6;
        let maxW = 0;
        for (const line of lines) {
          const m = ctx.measureText(line);
          if (m.width > maxW) maxW = m.width;
        }

        // Pill
        ctx.fillStyle = isSelected
          ? "rgba(255,251,243,0.98)"
          : isHovered
          ? "rgba(255,251,243,0.95)"
          : "rgba(245,240,232,0.8)";
        ctx.beginPath();
        ctx.roundRect(lx - maxW / 2 - 8, ly - fontSize, maxW + 16, totalH + 4, 5);
        ctx.fill();

        // Text
        ctx.fillStyle = isSelected
          ? "rgba(139,26,26,1)"
          : isHovered
          ? "rgba(139,26,26,1)"
          : "rgba(74,69,64,0.9)";
        lines.forEach((line, li) => {
          ctx.fillText(line, lx, ly + li * lineH);
        });
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("click", onClick);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [clients, setTooltip, onSelect, selected]);

  return (
    <div ref={containerRef} className="constellation" style={{ position: "relative", cursor: "pointer" }}>
      <canvas ref={canvasRef} />
      <div
        className={`constellation-tooltip ${tooltip.visible ? "visible" : ""}`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        {tooltip.name}
      </div>
    </div>
  );
}
