import React from 'react'

import _ from "lodash";
import WidgetEdit from './WidgetEdit'
import EkspandertBartWidget from './EkspandertBartWidget'

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
    this.onCollapse = this.onCollapse.bind(this, props.layout.i)
    this.onResize = this.onResize.bind(this, props.layout)
  }

  componentDidMount() {
    this.calculateSizes(this.props.layout)
  }

  onCollapse () {
    const { onWidgetCollapse, layout } = this.props
    if (onWidgetCollapse) {
      onWidgetCollapse(!this.props.collapsed, layout)
    }
  }

  onResize(layout, width, height) {
    console.log("WIDGET: onResize")
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

    const { mouseOver } = this.state
    const { edit } = this.props

    return <div className='c-ui-widget'
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
      { edit && mouseOver ?
        <WidgetEdit {...this.props}/> :
        <EkspandertBartWidget {...this.props}
        onResize={this.onResize}
        onCollapse={this.onCollapse}/>
      }
    </div>
  }
}
