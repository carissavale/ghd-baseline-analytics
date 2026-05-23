// 5 vertical gold bars — section divider used between major content blocks.
// Styles live in globals.css under .brand-divider since this is a pure shape.

export function BrandDivider() {
  return (
    <div className="brand-divider" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
