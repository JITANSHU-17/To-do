function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-text">
          <p className="app-label">PRODUCTIVITY APP</p>

          <h1>FocusList - Simple Task Management App</h1>

          <p className="app-description">
            FocusList is a simple and responsive task management app that
            helps you create, organize, prioritize, search, and complete
            your daily tasks in one place.
          </p>
        </div>

        <div
          className="header-badge"
          aria-label="Tasks are saved locally"
        >
          <span
            className="status-dot"
            aria-hidden="true"
          ></span>

          Saved locally
        </div>
      </div>
    </header>
  );
}

export default Header;