const noteDir = 'https://github.com/YaoKaiLun/yaokailun.github.io/blob/master/notes/'

class NotesList extends React.Component {
  renderItem(item) {
    return (
      <li class="note-item">
        <a href={noteDir + item.link}>{item.name}</a>
        <p class="note-date">--{item.date}</p>
      </li>
    )
  }
  render() {
    let notesData = this.props.notesData
    return (
      <ul class="note-list">
        {
          notesData.map(item => this.renderItem(item))
        }
      </ul>
    )
  }
}

class Notes extends React.Component {
  render() {
    return (
      <div class="container mt-4 mt-md-5 mb-5">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <h4 class="title mb-4 mb-md-5">笔记</h4>
            <NotesList notesData={window.notesData}/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Notes />,
  document.getElementById('app')
);
