import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import DashboardGrid from './DashboardGrid'

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
      title: widget.title,
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

  return <DashboardGrid
    {...props}
    layouts={layouts}
    widgets={widgets}
    mounted={mounted}
    onLayoutChange={onLayoutChange}
    onWidgetAdd={onWidgetAdd}
    onWidgetUpdate={onWidgetUpdate}
    onWidgetResize={onWidgetResize}
    onWidgetDelete={onWidgetDelete}
  />
}

DashboardArea.defaultProps = {
  cols: { lg: 12, md: 3, sm: 1 },
  rowHeight: 30
}

export default DashboardArea
