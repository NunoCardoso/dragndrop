import React from 'react'

export default class WidgetEdit extends React.Component {

  constructor(props) {
    super(props)
    this.onWidgetDeleteClick = this.onWidgetDeleteClick.bind(this)
  }

  onWidgetEditClick(e) {
    console.log(e)
  }

  onWidgetDeleteClick() {
    console.log("YES", this.props)
    if (this.props.onWidgetDelete) {
      this.props.onWidgetDelete(this.props.layout)
    }
  }

  render() {
    return <div className="editLayout"
    onClick={this.onWidgetEditClick}>
      <div className="editLayoutTitleDiv draggableHandle">
        <span className="editLayoutTitle">Editing</span>
        <span className="editLayoutDeleteButton">
          <a href="#" onClick={this.onWidgetDeleteClick}>[X]</a>
        </span>
      </div>
    </div>
  }
}
