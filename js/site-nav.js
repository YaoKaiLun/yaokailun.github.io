class SiteNav extends React.Component {
  render() {
    const { active } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light my-navbar">
        <button
          className="navbar-toggler float-right"
          type="button"
          data-toggle="collapse"
          data-target="#siteNavbar"
          aria-controls="siteNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="siteNavbar">
          <div className="navbar-nav">
            <a
              className={`nav-item nav-link${active === 'portfolio' ? ' active' : ''}`}
              href="/"
            >
              AI 创作集
            </a>
            <a
              className={`nav-item nav-link${active === 'books' ? ' active' : ''}`}
              href="/books/"
            >
              读书
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
