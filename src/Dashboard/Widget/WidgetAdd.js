import React, { useState } from 'react'
import { DragSource } from 'react-dnd'
import classNames from 'classnames'

import './Widget.css'

const WidgetAdd = (props) => {

  const [mouseOver, setMouseOver] = useState(false)

  return <div className={classNames('c-ui-d-widgetAdd', {
    'selected' : props.isDragging,
    'hover' : mouseOver}
    )}
    onMouseEnter={() => setMouseOver(true)}
    onMouseLeave={() => setMouseOver(false)}
    title={props.widget.description}
    ref={props.connectDragSource}>
    <div className='p-2 content'>
      <h6>{props.widget.title}</h6>
      <p><small>{props.widget.description}</small></p>
    </div>
  </div>
}

export default DragSource(
  'widgetAdd', {
    beginDrag: (props) => {
      console.log('Begin dragging widgetAdd')
      // return the object I want to send to dropTarged when dropped
      return {
        widgetTemplate: props.widget
      }
    },
    endDrag: (props, monitor) => {
      console.log('End dragging widgetAdd')
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        console.log('Dropped successfully a widgetAdd')
      }
    },
    canDrag: () => {
      return true
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(WidgetAdd)
