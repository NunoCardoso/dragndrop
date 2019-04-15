import React from 'react'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ReactResizeDetector from 'react-resize-detector';
import _ from "lodash";

import "bootstrap/dist/css/bootstrap.min.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./Dashboard.css"
import "./nav.css"
import "./hacks.css"

export default class Widget extends React.Component {

  state = {}

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      sizes: { lg: {}, md: {}, sm: {}},
      collapsed: props.collapsed,
      edit: props.edit
    }
  }

  onWidgetCollapseClick () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  onWidgetEditClick(e) {
    console.log(e)
  }

  onResize(layout, width, height) {

    const { onWidgetResizeDetected, currentBreakpoint } = this.props
    console.log("ON RESIZE WIDGET ", width, height, layout)
    let newSizes = _.cloneDeep(this.state.sizes)
    layout.h =  Math.ceil((height + 50) / this.props.rowHeight)
    newSizes[currentBreakpoint] = {
      width: document.getElementById("widget-" + layout.i).offsetWidth,
      height: document.getElementById("widget-" + layout.i).offsetHeight
    }
    this.setState({
      sizes: newSizes
    })
    onWidgetResizeDetected(layout)
  }

  render () {

    const { layout, currentBreakpoint } = this.props
    const { collapsed, edit, sizes } = this.state

    if (edit && _.isEmpty(sizes)) {
      let newSizes = _.cloneDeep(sizes)
      newSizes[this.state.currentBreakpoint] = {
        width: document.getElementById("widget-" + layout.i).offsetWidth,
        height: document.getElementById("widget-" + layout.i).offsetHeight
      }
      this.setState({
        sizes: newSizes
      })
    }

    return <div id={"widget-" + layout.i}>
      {edit ? <div className="EditLayout" style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        width: sizes[currentBreakpoint].width,
        height: sizes[currentBreakpoint].height,
        position: "absolute",
        zIndex: 2,
        textAlign: "center",
        lineHeight: sizes[currentBreakpoint].height + "px"
      }}
      onClick={this.onWidgetEditClick.bind(this)}>
      Editing
      </div> : null}
      <Ekspanderbartpanel apen={!collapsed} tittel="Klikk her for å åpne/lukke panelet"
      onClick={this.onWidgetCollapseClick.bind(this, layout.i)}>
        <div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this, layout)}/>
        {collapsed === true ? null : <div> Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          Panelet vil da ekspandere og vise innholdet.<br/>
          </div>}
        </div>
      </Ekspanderbartpanel>
    </div>
  }
}
