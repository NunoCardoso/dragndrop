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
    beginDrag: (props) => {
      console.log('begin dragging')
      return {
        widgetTemplate: props.widget
      }
    },
    endDrag: (props, monitor) => {
      console.log('end dragging')
      console.log(props)
      const item = monitor.getItem()
      console.log(item)
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        //window.alert("Dropped")
      }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(WidgetAdd)
