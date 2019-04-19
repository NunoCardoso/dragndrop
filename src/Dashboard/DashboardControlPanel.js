import React from 'react'
import DashboardConfig from './Config/DashboardConfig'

const DashboardControlPanel = (props) => {
  return <div className='c-ui-d-dashboardControlPanel m-2'>
    <div className='d-inline-block'>
      Current Breakpoint: {props.currentBreakpoint} ({
        props.cols[props.currentBreakpoint]
      } columns)
    </div>
    <div className='c-ui-d-dashboardControlPanel-buttons'>
      {props.editMode ? <button className='mr-2 c-ui-d-dashboardControlPanel-button'
        onClick={props.onAddChange}>
        {!props.addMode ? 'Add new widget' : 'Hide new widgets'}
      </button> : null}
      <button onClick={props.onEditModeChange}>
        {props.editMode ? 'Save dashboard' : 'Edit dashboard'}
      </button>
    </div>
  </div>
}

DashboardControlPanel.defaultProps = DashboardConfig

export default DashboardControlPanel
