import React from 'react'
import { DragSource } from 'react-dnd'

import './Widget.css'

const WidgetAdd = (props) => {
  return <div className='c-ui-d-widgetAdd'
    title={props.widget.description}
    ref={props.connectDragSource}>
    {props.widget.title}
  </div>
}

export default DragSource(
  'widgetAdd', {
    beginDrag: () => {
      console.log('begin dragging')
      return {
        id: 'I am an ID'
      }
    },
    endDrag: () => {
      console.log('end dragging')
      return {}
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(WidgetAdd)
