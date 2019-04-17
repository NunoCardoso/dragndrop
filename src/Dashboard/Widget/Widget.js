import React from 'react'

import _ from "lodash";
import WidgetEdit from './WidgetEdit'
import EkspandertBartWidget from './EkspandertBartWidget'

import "bootstrap/dist/css/bootstrap.min.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "../../nav.css"
import "./Widget.css"

export default class Widget extends React.Component {

  state = {}

  constructor(props) {
    super(props)
    this.state = {
      sizes: { lg: {}, md: {}, sm: {}},
      mouseOver: false
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    this.calculateSizes(this.props.layout)
  }

  onUpdate (update) {
    const { onWidgetUpdate, layout } = this.props
    if (onWidgetUpdate) {
      onWidgetUpdate(update, layout)
    }
  }

  onResize(width, height) {
    const { onWidgetResize, rowHeight, editMode, layout } = this.props
    this.calculateSizes(layout)
    if (onWidgetResize && !editMode) {
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
    const { editMode, widget } = this.props

    return <div className='c-ui-widget'
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
      { editMode && mouseOver ?
        <WidgetEdit {...this.props}/> : (function(self) {
          switch(widget.type) {
            case 'ekspandertBartWidget':
              return <EkspandertBartWidget {...self.props}
                onResize={self.onResize}
                onUpdate={self.onUpdate}/>
            default:
              return <div>No Widget</div>
          }
        })(this)
      }
    </div>
  }
}
