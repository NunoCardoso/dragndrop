import React, { useState, useEffect } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import classNames from 'classnames'
import './Widget.css'

const WidgetAdd = (props) => {
  const [mouseOver, setMouseOver] = useState(false)

  useEffect(() => {
    if (props.connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      props.connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      })
    }
  }, [])

  return <div>
    <div className={classNames('c-ui-d-widgetAdd', {
      'selected': props.isDragging,
      'hover': mouseOver }
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
      // const item = monitor.getItem()
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
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(WidgetAdd)
