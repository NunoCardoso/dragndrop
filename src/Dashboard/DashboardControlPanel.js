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
      {!props.editMode ? <button onClick={props.onEditModeOn}>
         Edit dashboard
        </button> : <React.Fragment>
          <button className='mr-2' onClick={props.onSaveEdit}>
          Save dashboard
          </button>
          <button className='mr-2' onClick={props.onCancelEdit}>
          Cancel dashboard
          </button>
        </React.Fragment>
      }
    </div>
  </div>
}

DashboardControlPanel.defaultProps = DashboardConfig

export default DashboardControlPanel
