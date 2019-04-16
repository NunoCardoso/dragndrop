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
    this.state = {
      sizes: { lg: {}, md: {}, sm: {}},
      mouseOver: false
    }
    this.onWidgetEditClick = this.onWidgetEditClick.bind(this)
    this.onWidgetCollapseClick = this.onWidgetCollapseClick.bind(this, props.layout.i)
    this.onResize = this.onResize.bind(this, props.layout)
  }

  componentDidMount() {
    this.calculateSizes(this.props.layout)
  }

  onWidgetCollapseClick () {
    const { onWidgetCollapse, layout } = this.props
    if (onWidgetCollapse) {
      onWidgetCollapse(!this.props.collapsed, layout)
    }
  }

  onWidgetEditClick(e) {
    console.log(e)
  }

  onResize(layout, width, height) {
    const { onWidgetResize, rowHeight, edit } = this.props
    this.calculateSizes(layout)
    if (onWidgetResize && !edit) {
      let newLayout = _.cloneDeep(layout)
      newLayout.h =  Math.ceil((height + 50) / rowHeight)
      onWidgetResize(newLayout)
    }
  }

  calculateSizes(layout) {
    const { currentBreakpoint } = this.props
    if (document.getElementById("widget-" + layout.i)) {
      let newSizes = {
        width: document.getElementById("widget-" + layout.i).offsetWidth,
        height: document.getElementById("widget-" + layout.i).offsetHeight
      }
      let oldSizes = _.cloneDeep(this.state.sizes)
      if (_.isEmpty(oldSizes[currentBreakpoint]) || (
       ( (oldSizes[currentBreakpoint].height !== newSizes.height) ||
        (oldSizes[currentBreakpoint].width !== newSizes.width) ) ) ) {
        oldSizes[currentBreakpoint] = newSizes
        this.setState({
          sizes: oldSizes
        })
      }
    }
  }

  onMouseEnter (e) {
    this.setState({
      mouseOver: true
    })
  }

  onMouseLeave (e) {
    this.setState({
      mouseOver: false
    })
  }

  render () {

    const { layout, collapsed, edit, currentBreakpoint } = this.props
    const { sizes, mouseOver } = this.state

    return <div className='c-ui-widget'
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
      { edit && mouseOver ? <div className="EditLayout"
      onClick={this.onWidgetEditClick}>
      Editing
      </div> :
      <Ekspanderbartpanel
        apen={!collapsed}
        tittel="Klikk her for å åpne/lukke panelet"
        onClick={this.onWidgetCollapseClick}>
        <div>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}/>
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
      </Ekspanderbartpanel> }
    </div>
  }
}
