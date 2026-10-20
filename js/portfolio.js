class ImageLightbox extends React.Component {
  componentDidMount() {
    this.previousActive = document.activeElement
    document.addEventListener('keydown', this.handleKey)
    document.body.classList.add('portfolio-lightbox-open')
    if (this.closeBtn) {
      this.closeBtn.focus()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey)
    document.body.classList.remove('portfolio-lightbox-open')
    if (this.previousActive && this.previousActive.focus) {
      this.previousActive.focus()
    }
  }

  handleKey = event => {
    if (event.key === 'Escape') {
      this.props.onClose()
    }
  }

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    const { src, alt, onClose } = this.props
    return (
      <div
        className="portfolio-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={alt ? `大图预览：${alt}` : '大图预览'}
        onClick={this.handleBackdropClick}
      >
        <button
          type="button"
          className="portfolio-lightbox-close"
          aria-label="关闭大图预览"
          ref={node => {
            this.closeBtn = node
          }}
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <img className="portfolio-lightbox-image" src={src} alt={alt || ''} />
      </div>
    )
  }
}

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

  openLightbox() {
    const { work, onOpenLightbox } = this.props
    if (!work.thumbnail || !onOpenLightbox) {
      return
    }
    const fullSrc = work.thumbnail.fullSrc || work.thumbnail.src
    onOpenLightbox(fullSrc, work.thumbnail.alt || work.title)
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
            <button
              type="button"
              className="work-thumb-btn"
              onClick={() => this.openLightbox()}
              aria-label={`查看大图：${work.thumbnail.alt || work.title}`}
            >
              <img
                className="work-thumb"
                src={work.thumbnail.src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </button>
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
  constructor(props) {
    super(props)
    this.state = {
      lightbox: null
    }
  }

  openLightbox = (src, alt) => {
    this.setState({ lightbox: { src, alt } })
  }

  closeLightbox = () => {
    this.setState({ lightbox: null })
  }

  render() {
    const profile = window.portfolioProfile
    const works = window.portfolioWorks
    const { lightbox } = this.state

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

            <section className="works-list" aria-label="作品集列表">
              {works.map((work, index) => (
                <WorkCard
                  key={work.title}
                  work={work}
                  index={index}
                  onOpenLightbox={this.openLightbox}
                />
              ))}
            </section>
          </div>
        </div>
        {lightbox ? (
          <ImageLightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={this.closeLightbox}
          />
        ) : null}
      </div>
    )
  }
}

ReactDOM.render(<Portfolio />, document.getElementById('app'))
