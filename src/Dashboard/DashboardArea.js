import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { DropTarget } from 'react-dnd'
import Widget from './Widget/Widget'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const DashboardArea = (props) => {
  const [mounted, setMounted] = useState(false)
  const [widgets, setWidgets] = useState([])
  const [layouts, setLayouts] = useState({})

  useEffect(() => {
    setWidgets(require('./Config/DefaultWidgets').default)
    setLayouts(require('./Config/DefaultLayout').default)
    setMounted(true)
  }, [])

  const onWidgetAdd = (widget) => {
    const newWidgets = _.cloneDeep(widgets)
    const countWidgets = Object.keys(newWidgets).length
    setWidgets(newWidgets.concat({
      i: countWidgets.toString(),
      type: widget.type,
      options: widget.options
    }))
    const newLayouts = _.cloneDeep(layouts)
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = newLayouts[breakpoint].concat({
        i: countWidgets.toString(),
        x: 0,
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      })
    })
    setLayouts(newLayouts)
  }

  const onWidgetUpdate = (update, layout) => {
    const newWidgets = _.cloneDeep(widgets)
    setWidgets(newWidgets.map((widget) => {
      return (widget.i === layout.i) ? update : widget
    }))
  }

  const onWidgetResize = layout => {
    const newLayout = _.cloneDeep(layouts)
    const index = _.findIndex(newLayout[props.currentBreakpoint], { 'i': layout.i })
    newLayout[props.currentBreakpoint][index] = layout
    setLayouts(newLayout)
  }

  const onWidgetDelete = layout => {
    let newWidgets = _.cloneDeep(widgets)
    newWidgets = _.reject(newWidgets, { 'i': layout.i })
    newWidgets = newWidgets.map((widget, i) => {
      widget.i = i.toString()
      return widget
    })
    let newLayout = _.cloneDeep(layouts)
    Object.keys(newLayout).forEach(breakpoint => {
      newLayout[breakpoint] = _.reject(newLayout[breakpoint], { 'i': layout.i })
      // re-sort layout ids in a sequential order, it is mandatory for react-grid-layout
      newLayout[breakpoint] = newLayout[breakpoint].map((layout, i) => {
        layout.i = i.toString()
        return layout
      })
    })
    setLayouts(newLayout)
    setWidgets(newWidgets)
  }

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts)
  }

  if (!mounted) {
    return <div>Wait</div>
  }

  return props.connectDropTarget(<div className='c-ui-d-dashboardArea'>
    <ResponsiveReactGridLayout
      {...props}
      breakpoints={{ lg: 900, md: 600, sm: 0 }}
      autoSize
      isDraggable={props.editMode}
      isResizable={props.editMode}
      layouts={layouts}
      onBreakpointChange={props.onBreakpointChange}
      onLayoutChange={onLayoutChange}
      measureBeforeMount={false}
      useCSSTransforms={mounted}
      preventCollision={false}
      draggableHandle={'.draggableHandle'}
    >
      {_.map(layouts[props.currentBreakpoint], (layout, i) => {
        return <div id={'widget-' + layout.i} key={i}>
          <Widget
            layout={layout}
            widget={widgets[layout.i]}
            editMode={props.editMode}
            currentBreakpoint={props.currentBreakpoint}
            onWidgetResize={onWidgetResize}
            onWidgetUpdate={onWidgetUpdate}
            onWidgetDelete={onWidgetDelete}
            rowHeight={props.rowHeight}
          /></div>
      })}
    </ResponsiveReactGridLayout>
  </div>)
}

DashboardArea.defaultProps = {
  cols: { lg: 12, md: 3, sm: 1 },
  rowHeight: 30
}

export default DropTarget(
  ['widgetAdd', 'dashboard'],
  {
    canDrop: props => {
      console.log('I am DashboardArea, you can drop here')
      return true
    },
    drop: (props, monitor, component) => {
      console.log('Something good dropped')
      let item = monitor.getItem()
      console.log(props)
      console.log(monitor)
      console.log(component)
    //  component.props.onWidgetAdd(item)
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
)(DashboardArea)
