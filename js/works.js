class WorksList extends React.Component {
  renderItem(item) {
    return (
      <li>
        <div class="row mb-3">
          <div class="col-12 col-md-7 order-2 order-md-1" dangerouslySetInnerHTML={{__html: item.title}}></div>
          <div class="d-block"></div>
          <div class="col-12 col-md-5 order-md-2 timeline-date">{item.date}</div>
        </div>
        {
          item.type === 'normal' &&
          (
            <div class="row mt-2">
              <div class="col-12 mb-2 timeline-img-wrapper">
                <img class="timeline-img" src={item.cover} />
              </div>
            </div>
          )
        }
        {
          item.type === 'image' &&
          (
            <div class="row mt-2">
              <div class="col-12 col-md-5 mb-2 timeline-img-wrapper">
                <img class="timeline-img" src={item.cover} />
              </div>
              <div class="d-block"></div>
              <div class="col-12 col-md-7 timeline-content">{item.content}</div>
            </div>
          )
        }
        {
          item.type === 'text' &&
          (
            <div class="row mt-2 mb-2" dangerouslySetInnerHTML={{__html: item.content}}></div>
          )
        }
      </li>
    )
  }
  render() {
    let worksData = this.props.worksData
    return (
      <ul class="timeline">
        {
          worksData.map(item => this.renderItem(item))
        }
      </ul>
    )
  }
}

class Works extends React.Component {
  render() {
    return (
      <div class="container mt-4 mt-md-5 mb-5">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <h4 class="title mb-4 mb-md-5">作品集</h4>
            <h6 class="company mb-2 mb-md-3">广州爱范儿科技股份有限公司（Oct, 2016 - now）</h6>
            <WorksList worksData={window.worksData}/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Works />,
  document.getElementById('app')
);