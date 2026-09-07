import { useMemo } from "react";
import CubeFace from "./CubeFace";

const SLOTS = 4; // four lateral faces carry client content

const mod4 = (n) => ((n % 4) + 4) % 4;

/**
 * ClientCube — the physical archive object.
 *
 * Four lateral faces exist in real 3D space (rotateY(s·90°) +
 * translateZ). The dataset can hold many more than four clients,
 * so faces are recycled as the cube turns: for a continuous
 * archive position `position` the face contents follow a virtual
 * ring, and content only ever changes while a face is edge-on to
 * the viewer (crossing a 90° boundary), so the cube reads as one
 * continuous object rather than a slide deck.
 *
 * `top/bottom` faces are non-recycled architectural surfaces that
 * give the object thickness; they become visible through the fixed
 * rotateX tilt.
 */
export default function ClientCube({
  entries,
  position = 0,
  floor,
  active,
  total,
  managedRotation = false,
  drawerOpen = false,
  onOpenEntry,
  registerCube,
}) {
  // Which lateral slot is the live client riding in.
  const slotOf = (index) => mod4(index);

  const faces = useMemo(() => {
    const n = entries.length;
    const k = Math.max(0, Math.min(n - 1, floor));
    const front = mod4(k);

    const list = [];
    for (let s = 0; s < SLOTS; s++) {
      const offset = mod4(s - front);
      const contentIndex = k + offset;
      list.push({
        slot: s,
        contentIndex,
        entry: contentIndex >= 0 && contentIndex < n ? entries[contentIndex] : null,
      });
    }
    return list;
  }, [entries, floor]);

  // Rotation the GSAP scrub owns (desktop) is applied imperatively,
  // so we must not re-assert it from React on re-renders.
  const transform = managedRotation
    ? undefined
    : `rotateX(-10deg) rotateY(${-90 * position}deg)`;

  return (
    <div className="tt-cube-scene">
      <div className="tt-cube-stage">
        <div
          className="tt-cube"
          style={{ transform }}
          data-managed={managedRotation || undefined}
          ref={registerCube}
        >
          {faces.map(({ slot, entry }) => (
            <CubeFace
              key={`slot-${slot}`}
              entry={entry}
              total={total}
              deg={slot * 90}
              actionable={entry && entry.index === active}
              drawerOpen={drawerOpen}
              onOpenEntry={onOpenEntry}
            />
          ))}

          {/* Thickness / architectural surfaces */}
          <div className="tt-face tt-face-top" aria-hidden="true">
            <span>Strut Engineering · Client Archive</span>
          </div>
          <div className="tt-face tt-face-bottom" aria-hidden="true" />
        </div>

        <span className="tt-cube-shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
