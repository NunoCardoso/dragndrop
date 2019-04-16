import React from 'react'
import { DragSource } from 'react-dnd'

import './Widget.css'

class WidgetAdd extends React.Component {

  render() {
    return <div className="widgetAdd" ref={this.props.connectDragSource}>
      {this.props.text}
    </div>
  }
}

export default DragSource(
  'dashboard', {
    beginDrag: () => {
      console.log("begin dragging")
      return {
        id: "I am an ID"
      }
    },
    endDrag: () => {
      console.log("end dragging")
      return {}
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(WidgetAdd)
