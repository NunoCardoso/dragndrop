import React from 'react'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { DropTarget } from 'react-dnd'
import WidgetWrapper from './Widget/WidgetWrapper'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const DashboardGrid = (props) => {

  return props.connectDropTarget(<div className='c-ui-d-dashboardGrid'>
    <ResponsiveReactGridLayout
      {...props}
      breakpoints={{ lg: 900, md: 600, sm: 0 }}
      autoSize
      isDraggable={props.editMode}
      isResizable={props.editMode}
      layouts={props.layouts}
      onBreakpointChange={props.onBreakpointChange}
      onLayoutChange={props.onLayoutChange}
      measureBeforeMount={false}
      useCSSTransforms={props.mounted}
      preventCollision={false}
      draggableHandle={'.draggableHandle'}
    >
      {_.map(props.layouts[props.currentBreakpoint], (layout, i) => {
        return <div id={'widget-' + layout.i} key={i}>
          <WidgetWrapper
            layout={layout}
            widget={props.widgets[layout.i]}
            editMode={props.editMode}
            currentBreakpoint={props.currentBreakpoint}
            onWidgetResize={props.onWidgetResize}
            onWidgetUpdate={props.onWidgetUpdate}
            onWidgetDelete={props.onWidgetDelete}
            rowHeight={props.rowHeight}
          /></div>
      })}
    </ResponsiveReactGridLayout>
  </div>)
}

DashboardGrid.defaultProps = {
  cols: { lg: 12, md: 3, sm: 1 },
  rowHeight: 30
}

export default DropTarget(
  ['widgetAdd'],
  {
    canDrop: props => {
      console.log('I am DashboardGrid, you can drop here')
      return true
    },
    drop: (props, monitor, component) => {
      console.log('Something good dropped')
      let droppedItem = monitor.getItem()
      props.onWidgetAdd(droppedItem.widgetTemplate)
    },
    hover: props => {
      console.log('Something good is hovering')
    }
  },
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }
  }
)(DashboardGrid)
