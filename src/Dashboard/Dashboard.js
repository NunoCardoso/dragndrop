import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import WidgetAddArea from './Widget/WidgetAddArea'
import DashboardArea from './DashboardArea'
import DashboardControlPanel from './DashboardControlPanel'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './grid.css'

import './Dashboard.css'
import '../nav.css'

const Dashboard = () => {
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [availableWidgets, setAvailableWidgets] = useState([])

  useEffect(() => {
    setAvailableWidgets(require('./Config/AvailableWidgets').default)
  })

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }

  const onEditModeChange = () => {
    setEditMode(!editMode)
    setAddMode(false)
  }

  const onAddChange = () => {
    setAddMode(!addMode)
  }

  return <div className='c-ui-d-dashboard'>
    <DashboardControlPanel
      addMode={addMode}
      currentBreakpoint={currentBreakpoint}
      editMode={editMode}
      onEditModeChange={onEditModeChange}
      onAddChange={onAddChange} />
    {addMode ? <WidgetAddArea
      availableWidgets={availableWidgets} />
      : null}
    <DashboardArea
      editMode={editMode}
      currentBreakpoint={currentBreakpoint}
      onBreakpointChange={onBreakpointChange} />
  </div>
}

Dashboard.defaultProps = {
  // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  cols: { lg: 12, md: 3, sm: 1 }
}

export default DragDropContext(HTML5Backend)(Dashboard)
