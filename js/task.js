class ListGroup extends React.Component {
  renderTheme1(item) {
    return (
      <div className="list-group-item bg-transparent">
        <div className="d-flex w-100 justify-content-between card-1-content">
          <p className="mb-1"><a href={item.link}>{item.name}</a></p>
          <small>{item.start}</small>
        </div>
      </div>
    )
  }

  renderTheme2(item) {
    return (
      <div className="list-group-item bg-transparent ">
        <div className="card-2-content">
          <p><a href={item.link}>{item.name}</a></p>
          <small><i>{item.start} - {item.end}</i></small>
        </div>
      </div>
    )
  }

  renderTheme3(item) {
    return (
      <div className="list-group-item bg-transparent">
        <div className="card-3-content">
          <p><a href={item.link}>{item.name}</a></p>
          <small><i>{item.start} - {item.end}</i></small>
        </div>
      </div>
    )
  }

  renderList() {
    let {listData, type} = this.props

    switch (type) {
      case 'card1':
        return listData.map(item => this.renderTheme1(item))
      case 'card2':
        return listData.map(item => this.renderTheme2(item))
      case 'card3':
        return listData.map(item => this.renderTheme3(item))
      default:
        return listData.map(item => this.renderTheme1(item))
    }
  }

  render() {
    return (
      <div className="list-group list-group-flush">
        {this.renderList()}
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
            <a class="nav-item nav-link active" href="#">任务</a>
            <a class="nav-item nav-link" target="_blank" href="../notes.html">笔记</a>
            <a class="nav-item nav-link" target="_blank" href="../works.html">作品集</a>
          </div>
        </div>
      </nav>
    )
  }
  render() {
    return (
      <div className="container-fluid">
        {this.renderNavbar()}
        <div className="row dashboard">
          <div className="col-12 col-sm-12 col-lg-4 mb-3 mb-sm-3">
            <div className="card card-1">
              <div className="card-header text-white">
                正在执行中的计划
              </div>
              <div className="card-body">
                <ListGroup type="card1" listData={window.doingThings} />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-lg-4 mb-3 mb-sm-3">
            <div className="card card-2">
              <div className="card-header text-white">
                已完成的任务
              </div>
              <div className="card-body">
                <ListGroup type="card2" listData={window.finishedTasks} />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-lg-4 mb-3 mb-sm-3">
            <div className="card card-3">
              <div className="card-header">
                已看过的技术书
              </div>
              <div className="card-body">
                <ListGroup type="card3" listData={window.readedBooks} />
              </div>
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