class WorkCard extends React.Component {
  renderLink(link) {
    if (link.placeholder) {
      return (
        <span
          key={link.label}
          className="work-link work-link-placeholder"
          title="UP 主尚未提供 B 站系列链接，请在 portfolio-data.js 中更新 url"
        >
          <i className={link.icon} aria-hidden="true"></i>
          {link.label}
        </span>
      )
    }
    return (
      <a
        key={link.label}
        className="work-link"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.icon ? <i className={link.icon} aria-hidden="true"></i> : null}
        {link.label}
      </a>
    )
  }

  render() {
    const { work, index } = this.props
    return (
      <article
        className="work-card"
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        {work.thumbnail ? (
          <div className="work-thumb-wrap">
            <img
              className="work-thumb"
              src={work.thumbnail.src}
              alt={work.thumbnail.alt || work.title}
              width="640"
              height="360"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className="work-card-body">
        <h2 className="work-title">{work.title}</h2>
        {work.meta ? <p className="work-meta">{work.meta}</p> : null}
        <p className="work-description">{work.description}</p>
        {work.episodes && work.episodes.length ? (
          <ul className="work-episode-list" aria-label="分集列表">
            {work.episodes.map(episode => (
              <li key={episode}>{episode}</li>
            ))}
          </ul>
        ) : null}
        <div className="work-tags">
          {work.tags.map(tag => (
            <span key={tag} className="work-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="work-links">{work.links.map(link => this.renderLink(link))}</div>
        </div>
      </article>
    )
  }
}

class Portfolio extends React.Component {
  render() {
    const profile = window.portfolioProfile
    const works = window.portfolioWorks

    return (
      <div className="container-fluid portfolio-page">
        <SiteNav active="portfolio" />
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <header className="portfolio-header">
              <p className="portfolio-greeting">{profile.name}</p>
              <h1>AI 创作集</h1>
              <p className="portfolio-subtitle">{profile.title}</p>
              <p className="portfolio-intro">{profile.intro}</p>
            </header>

            <section className="works-grid" aria-label="作品集列表">
              {works.map((work, index) => (
                <WorkCard key={work.title} work={work} index={index} />
              ))}
            </section>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Portfolio />, document.getElementById('app'))
