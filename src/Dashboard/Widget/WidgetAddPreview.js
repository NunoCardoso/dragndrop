import React from 'react'
import { DragLayer } from 'react-dnd'
import Widget from './Widget'
import DashboardConfig from '../Config/DashboardConfig'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}
function getItemStyles (props, dimensions) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }
  let { x, y } = currentOffset
  return {
    transform: `translate(${x}px, ${y}px)`,
    backgroundColor: 'white',
    width: dimensions.width,
    height: dimensions.height,
    padding: '10px',
    border: '1px solid lightgrey',
    boxShadow: '3px 3px 3px lightgrey'
  }
}

const gridSizeToPixelSize = (w, h, breakpoint) => {
  let gridWidth = document.getElementById('dashboardGrid').offsetWidth
  let gridUnitWidth = Math.ceil(gridWidth / DashboardConfig.cols[breakpoint])
  const dimension = {
    height: (h * (DashboardConfig.rowHeight + 10) - 10) + 'px',
    width: (w * gridUnitWidth - 10) + 'px',
  }
  console.log(gridWidth, gridUnitWidth, w, h, dimension)
  return dimension
}

const WidgetAddPreview = props => {
  if (!props.isDragging) {
    return null
  }
  let widget = props.item.widgetTemplate
  let dimensions = gridSizeToPixelSize(
    widget.layout[props.currentBreakpoint].defaultW,
    widget.layout[props.currentBreakpoint].defaultH,
    props.currentBreakpoint
  )
  return <div style={layerStyles}>
    <div style={getItemStyles(props, dimensions)}>
      <Widget widget={widget} />
    </div>
  </div>
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(WidgetAddPreview)
