import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import WidgetAddArea from './Widget/WidgetAddArea'
import DashboardGrid from './DashboardGrid'
import DashboardControlPanel from './DashboardControlPanel'
import DashboardConfig from './Config/DashboardConfig'
import * as DashboardAPI from './API/DashboardAPI'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './grid.css'

import './Dashboard.css'
import '../nav.css'

const Dashboard = () => {
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [widgets, setWidgets] = useState([])
  const [layouts, setLayouts] = useState({})
  const [backupLayouts, setBackupLayouts] = useState({})
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [availableWidgets, setAvailableWidgets] = useState([])

  useEffect(async () => {
    setAvailableWidgets(require('./Config/AvailableWidgets').default)
    const [_widgets, _layouts] = await DashboardAPI.loadDashboard()
    setWidgets(_widgets)
    setLayouts(_layouts)
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
    const index = _.findIndex(newLayout[currentBreakpoint], { 'i': layout.i })
    newLayout[currentBreakpoint][index] = layout
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

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }

  const onEditModeOn = () => {
    setEditMode(true)
    setAddMode(false)
    setBackupLayouts(layouts)
  }

  const onAddChange = () => {
    setAddMode(!addMode)
  }

  const onCancelEdit = () => {
    setEditMode(false)
    setLayouts(backupLayouts)
  }

  const onSaveEdit = async () => {
    await DashboardAPI.saveDashboard(widgets, layouts)
    setEditMode(false)
  }

  if (!mounted) {
    return <div>Wait</div>
  }

  return <div className='c-ui-d-dashboard'>
    <DashboardControlPanel
      addMode={addMode}
      currentBreakpoint={currentBreakpoint}
      editMode={editMode}
      onEditModeOn={onEditModeOn}
      onCancelEdit={onCancelEdit}
      onSaveEdit={onSaveEdit}
      onAddChange={onAddChange} />
    {addMode ? <WidgetAddArea
      currentBreakpoint={currentBreakpoint}
      availableWidgets={availableWidgets} />
      : null}
      <DashboardGrid
        editMode={editMode}
        layouts={layouts}
        widgets={widgets}
        mounted={mounted}
        currentBreakpoint={currentBreakpoint}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        onWidgetAdd={onWidgetAdd}
        onWidgetUpdate={onWidgetUpdate}
        onWidgetResize={onWidgetResize}
        onWidgetDelete={onWidgetDelete}
      />

  </div>
}

Dashboard.defaultProps = DashboardConfig

export default DragDropContext(HTML5Backend)(Dashboard)
