export function SkeletonDetail() {
  return (
    <div className="card shadow-sm border">
      <div className="card-body p-4 p-md-5">
        <div className="placeholder-glow">
          <span className="placeholder col-8" style={{ height: 28 }} />
          <span className="placeholder col-12 d-block mt-3" />
          <span className="placeholder col-10 d-block mt-2 mb-4" />
          <div className="d-flex flex-wrap gap-2">
            <span className="placeholder col-2" style={{ height: 28 }} />
            <span className="placeholder col-2" style={{ height: 28 }} />
            <span className="placeholder col-2" style={{ height: 28 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
