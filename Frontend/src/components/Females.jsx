import { useRef, useCallback } from "react";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";
import img7 from "../images/7.jpg";

const images = [
  img1, img2, img3, img4, img5, img6, img7
];
const IMAGE_COUNT = images.length;

// How many cards to advance per arrow click. Bump this to 2 or 3 if you
// want each click to move further.
const CARDS_PER_CLICK = 1;

export default function Females() {
  const trackRef = useRef(null); // scrollable wrapper (.moving-images-wrapper)
  const innerTrackRef = useRef(null); // flex row holding the cards (.moving-images-track)
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });

  // Distance from one card's start to the next (width + gap), measured live
  // so it stays correct across the responsive breakpoints in items.css.
  // NOTE: this must read the *cards* (children of innerTrackRef), not the
  // wrapper's children -- the wrapper only has one child (the track div),
  // which was previously causing getStep() to fall back to el.clientWidth
  // (i.e. scroll a full screen-width per click).
  const getStep = () => {
    const track = innerTrackRef.current;
    const el = trackRef.current;
    if (!track || track.children.length < 2) return el ? el.clientWidth : 0;
    const cardStep = track.children[1].offsetLeft - track.children[0].offsetLeft;
    return cardStep * CARDS_PER_CLICK;
  };

  const scrollByStep = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const step = getStep();
    const atRightEdge = direction > 0 && el.scrollLeft >= maxScroll - 2;
    const atLeftEdge = direction < 0 && el.scrollLeft <= 2;

    if (atRightEdge) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (atLeftEdge) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      el.scrollBy({ left: step * direction, behavior: "smooth" });
    }
  };

  // Click-and-drag support for desktop/trackpad users
  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !dragState.current.isDown) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 3) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - delta;
  };

  const endDrag = useCallback((e) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.classList.remove("is-dragging");
    if (e && e.pointerId !== undefined) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // pointer may already be released; safe to ignore
      }
    }
  }, []);

  return (
    <div className="moving-images-section">
      <button
        type="button"
        className="moving-images-arrow moving-images-arrow-left"
        onClick={() => scrollByStep(-1)}
        aria-label="Show previous image"
      >
        <ArrowIcon direction="left" />
      </button>

      <div
        className="moving-images-wrapper"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        role="region"
        aria-label="Fashion preview gallery"
      >
        <div className="moving-images-track" ref={innerTrackRef}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Fashion preview ${(index % IMAGE_COUNT) + 1}`}
              className="moving-image"
              draggable="false"
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="moving-images-arrow moving-images-arrow-right"
        onClick={() => scrollByStep(1)}
        aria-label="Show next image"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

function ArrowIcon({ direction }) {
  const rotation = direction === "left" ? 180 : 0;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}