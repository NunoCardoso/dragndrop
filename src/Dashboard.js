import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from './Widget'

import "bootstrap/dist/css/bootstrap.min.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./Dashboard.css"
import "./nav.css"
import "./hacks.css"

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Dashboard extends React.PureComponent {
  static defaultProps = {
    rowHeight: 30,
    //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 12, md: 3, sm: 1}
  };

  state = {
    edit: false,
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    collapsed: {
      "0": false,
      "1": true,
      "2": true,
      "3": true
    },
    layouts: {
      lg: [
        {x: 0, y: 0, w: 8, h: 2, i: "0"},
        {x: 8, y: 0, w: 4, h: 2, i: "1"},
        {x: 0, y: 4, w: 8, h: 2, i: "2"},
        {x: 8, y: 4, w: 4, h: 2, i: "3"}
      ],
      md: [
        {x: 0, y: 0, w: 2, h: 2, i: "0"},
        {x: 2, y: 0, w: 1, h: 2, i: "1"},
        {x: 0, y: 4, w: 2, h: 2, i: "2"},
        {x: 2, y: 4, w: 1, h: 2, i: "3"}
      ],
      sm: [
        {x: 0, y: 0, w: 2, h: 2, i: "0"},
        {x: 2, y: 0, w: 1, h: 2, i: "1"},
        {x: 0, y: 4, w: 2, h: 2, i: "2"},
        {x: 2, y: 4, w: 1, h: 2, i: "3"}
      ]
    }
  };

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  onEditChange () {
    this.setState({
      edit: !this.state.edit
    })
  }

  onWidgetResizeDetected (layout) {
    console.log("ON RESIZE LAYOUT ", layout)
    let newLayout = _.cloneDeep(this.state.layouts)
    let index = _.findIndex(newLayout[this.state.currentBreakpoint], {"i" : layout.i})
    newLayout[this.state.currentBreakpoint][index] = layout
    console.log(newLayout)
    this.setState({
      layouts: newLayout
    })
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onLayoutChange = (layout, layouts) => {
    console.log("onLayoutChange call")
    this.setState({
       layouts: layouts
    })
  };

  render() {
    if (!this.state.mounted) {
      return <div>Wait</div>
    }
    let self = this
    return <div>
      <div className='d-flex m-2 justify-content-between'>
        <div className='d-inline-block'>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <button onClick={this.onEditChange.bind(this)}>
          {this.state.edit ? "Editing" : "Edit"}
        </button>
      </div>
      <ResponsiveReactGridLayout
        breakpoints={{lg: 900, md: 600, sm: 0}}
        {...this.props}
        autoSize={true}
        isDraggable={this.state.edit}
        isResizable={this.state.edit}
        layouts={this.state.layouts}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={this.state.mounted}
        compactType={this.state.compactType}
        preventCollision={!this.state.compactType}
      >
      {_.map(this.state.layouts[this.state.currentBreakpoint], function(l, i) {
        return <div key={i}>
        <Widget
        layout={l}
        collapsed={self.state.collapsed[l.i]}
        edit={self.state.edit}
        currentBreakpoint={self.state.currentBreakpoint}
        onWidgetResizeDetected={self.onWidgetResizeDetected.bind(self)}
        rowHeight={30}
        /></div>
      })}
      </ResponsiveReactGridLayout>
    </div>
  }
}
