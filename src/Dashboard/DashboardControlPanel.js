import React from 'react'

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

DashboardControlPanel.defaultProps = {
  // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  cols: { lg: 12, md: 3, sm: 1 }
}

export default DashboardControlPanel
