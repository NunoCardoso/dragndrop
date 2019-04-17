import React from 'react'

export default class DashboardControlPanel extends React.Component {

  static defaultProps = {
    //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 12, md: 3, sm: 1}
  }

  render() {
    const { editMode, addMode, currentBreakpoint, onAddChange, onEditModeChange } = this.props
    return <div className='d-flex m-2 justify-content-between'>
      <div className='d-inline-block'>
        Current Breakpoint: {currentBreakpoint} ({
          this.props.cols[currentBreakpoint]
        }{" "}columns)
      </div>
      <div className="buttons">
        {editMode ? <button onClick={onAddChange}>
          {!addMode ? "Add new" : "Hide new"}
        </button> : null}
        <button onClick={onEditModeChange}>
          {editMode ? "Editing" : "Edit"}
        </button>
      </div>
    </div>
  }
}
