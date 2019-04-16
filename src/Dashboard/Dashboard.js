import React from "react";

import WidgetAdd from '../Widget/WidgetAdd'
import DashboardArea from './DashboardArea'

import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import "bootstrap/dist/css/bootstrap.min.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./Dashboard.css"
import "../nav.css"

class Dashboard extends React.PureComponent {

  static defaultProps = {
    //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 12, md: 3, sm: 1}
  }

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      add: false,
      currentBreakpoint: "lg",
      availableWidgets: [{
        type: "ekspandertBartWidget",
        options: {
          title: "New widget",
          collapsed: false
        }
      }]
    }
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    })
  }

  onEditChange = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  onAddChange = () => {
    this.setState({
      add: !this.state.add
    })
  }

  render() {
    const { edit, add, currentBreakpoint } = this.state

    return <div>
      <div className='d-flex m-2 justify-content-between'>
        <div className='d-inline-block'>
          Current Breakpoint: {currentBreakpoint} ({
            this.props.cols[currentBreakpoint]
          }{" "}columns)
        </div>
        <div className="buttons">
          {edit ? <button onClick={this.onAddChange.bind(this)}>
            {!add ? "Add new" : "Hide new"}
          </button> : null}
          <button onClick={this.onEditChange.bind(this)}>
            {edit ? "Editing" : "Edit"}
          </button>
        </div>
      </div>
      <div>
        {add ? <div>
          <WidgetAdd text={'Add Widget'}/>
        </div>: null}
          <DashboardArea edit={edit}
           currentBreakpoint={currentBreakpoint}
           onBreakpointChange={this.onBreakpointChange}/>
      </div>
    </div>
  }
}

export default DragDropContext(HTML5Backend)(Dashboard)
