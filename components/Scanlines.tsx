/** Site-wide CRT scanline + film grain overlay. Fixed, non-interactive, very subtle. */
export default function Scanlines() {
  return (
    <>
      <div
        aria-hidden
        className="scanlines pointer-events-none fixed inset-0 z-[70]"
      />
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[70]" />
    </>
  );
}
