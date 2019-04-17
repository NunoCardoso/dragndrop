import React from 'react'
import { DragLayer } from 'react-dnd'
import Widget from './Widget'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}
function getItemStyles(props) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
    backgroundColor: 'white',
    maxWidth: '50%',
    padding: '10px',
    border: '1px solid lightgrey',
    boxShadow: '3px 3px 3px lightgrey'
  }
}

const WidgetAddPreview = props => {
  const { item, isDragging } = props

  if (!isDragging) {
    return null
  }

  let widget = props.item.widgetTemplate

  return <div style={layerStyles}>
    <div style={getItemStyles(props)}>
      <Widget widget={widget}/>
    </div>
  </div>
}
export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(WidgetAddPreview)
