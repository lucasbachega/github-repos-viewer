export function SkeletonUserSidebar() {
  return (
    <aside>
      <div className="placeholder-glow">
        <span className="placeholder rounded-circle d-block" style={{ width: 112, height: 112 }} />
        <span className="placeholder col-8 d-block mt-3" />
        <span className="placeholder col-5 d-block mt-2" />
      </div>
      <div className="placeholder-glow mt-3">
        <span className="placeholder col-10 d-block" />
        <span className="placeholder col-9 d-block mt-2" />
      </div>
      <div className="placeholder-glow mt-3">
        <span className="placeholder col-7 d-block" />
        <span className="placeholder col-8 d-block mt-2" />
      </div>
    </aside>
  );
}

export function SkeletonRepoCards() {
  return (
    <ul className="list-group list-group-flush">
      {[1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="list-group-item">
          <div className="placeholder-glow">
            <span className="placeholder col-3" />
            <span className="placeholder col-12 d-block mt-2" />
            <span className="placeholder col-8 d-block mt-2" />
            <div className="d-flex gap-2 mt-2">
              <span className="placeholder col-2" />
              <span className="placeholder col-2" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
