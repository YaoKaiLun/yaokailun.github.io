class ListGroup extends React.Component {
  renderBook(item) {
    return (
      <div className="book-item">
        <div className="book-content">
          <div className="book-meta">
            <i className="far fa-calendar-alt"></i>
            <span className="book-date">{item.start}</span>
            {item.start !== item.end && (
              <div className="date-range">
                <span className="date-separator">-</span>
                <span className="book-date">{item.end}</span>
              </div>
            )}
          </div>
          <h3 className="book-title">
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
            ) : (
              <span>{item.name}</span>
            )}
          </h3>
        </div>
      </div>
    )
  }

  render() {
    let {listData} = this.props
    return (
      <div>
        {listData.map((item, index) => (
          <div key={index} className="book-item-wrapper" style={{animationDelay: `${index * 0.05}s`}}>
            {this.renderBook(item)}
          </div>
        ))}
      </div>
    )
  }
}

class Task extends React.Component {
  renderNavbar() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
        <button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">已看过的技术书</a>
          </div>
        </div>
      </nav>
    )
  }

  getBooksByYearAndMonth() {
    const books = window.readedBooks
    const grouped = {}
    
    books.forEach(book => {
      const month = book.end
      if (!grouped[month]) {
        grouped[month] = []
      }
      grouped[month].push(book)
    })
    
    const yearMap = {}
    Object.keys(grouped).sort((a, b) => b.localeCompare(a)).forEach(month => {
      const year = month.split('/')[0]
      if (!yearMap[year]) {
        yearMap[year] = []
      }
      yearMap[year].push({
        month,
        books: grouped[month]
      })
    })
    
    return Object.keys(yearMap)
      .sort((a, b) => b - a)
      .map(year => ({
        year,
        months: yearMap[year]
      }))
  }

  render() {
    const booksByYear = this.getBooksByYearAndMonth()
    
    return (
      <div className="container-fluid books-page">
        {this.renderNavbar()}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-11">
            <header className="books-header">
              <h1>📚 已看过的技术书</h1>
              <p className="books-count">共 {window.readedBooks.length} 本书</p>
            </header>
            
            <div className="books-content">
              {booksByYear.map(({year, months}) => (
                <section key={year} className="year-section">
                  <h2 className="year-title">
                    <span className="year-badge">{year}</span>
                    <span className="year-count">{months.reduce((sum, m) => sum + m.books.length, 0)} 本</span>
                  </h2>
                  {months.map(({month, books}) => (
                    <div key={month} className="month-section">
                      <h3 className="month-title">{month}</h3>
                      <div className="books-grid">
                        <ListGroup listData={books} />
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Task />,
  document.getElementById('app')
);
