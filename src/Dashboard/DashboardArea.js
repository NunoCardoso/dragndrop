import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import DashboardGrid from './DashboardGrid'
import DashboardConfig from './Config/DashboardConfig'

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
    const newId = 'w' + new Date().getTime()
    setWidgets(newWidgets.concat({
      i: newId,
      type: widget.type,
      title: widget.title,
      options: widget.options
    }))
    const newLayouts = _.cloneDeep(layouts)
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = newLayouts[breakpoint].concat({
        i: newId,
        x: 0,
        y: Infinity, // puts it at the bottom
        w: widget.layout[breakpoint].defaultW,
        h: widget.layout[breakpoint].defaultH,
        minW: widget.layout[breakpoint].minW,
        minH: widget.layout[breakpoint].minH,
        maxW: widget.layout[breakpoint].maxW,
        maxH: widget.layout[breakpoint].maxH
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
    setWidgets(newWidgets)

    let newLayout = _.cloneDeep(layouts)
    Object.keys(newLayout).forEach(breakpoint => {
      newLayout[breakpoint] = _.reject(newLayout[breakpoint], { 'i': layout.i })
    })
    setLayouts(newLayout)
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

DashboardArea.defaultProps = DashboardConfig

export default DashboardArea
