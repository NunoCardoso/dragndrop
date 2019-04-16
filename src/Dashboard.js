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

  constructor(props) {
    super(props)
    this.state = {
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
    }
    this.onWidgetResize = this.onWidgetResize.bind(this)
    this.onWidgetCollapse = this.onWidgetCollapse.bind(this)
  }

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

  setLayouts(layouts) {
    this.setState({
      layouts: layouts
    })
  }

  onWidgetCollapse (collapsed, layout) {
    let newCollapsed = _.cloneDeep(this.state.collapsed)
    newCollapsed[layout.i] = collapsed
    this.setState({
      collapsed: newCollapsed
    })
  }

  onWidgetResize (layout) {
    let newLayout = _.cloneDeep(this.state.layouts)
    let index = _.findIndex(newLayout[this.state.currentBreakpoint], {"i" : layout.i})
    newLayout[this.state.currentBreakpoint][index] = layout
    this.setLayouts(newLayout)
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.setLayouts(layouts)
  };

  render() {
    const { cols, rowHeight } = this.props
    const { edit, collapsed, compactType, layouts, mounted, currentBreakpoint } = this.state

    if (!mounted) {
      return <div>Wait</div>
    }
    let self = this
    return <div>
      <div className='d-flex m-2 justify-content-between'>
        <div className='d-inline-block'>
          Current Breakpoint: {currentBreakpoint} ({
            cols[currentBreakpoint]
          }{" "}
          columns)
        </div>
        <button onClick={this.onEditChange.bind(this)}>
          {edit ? "Editing" : "Edit"}
        </button>
      </div>
      <ResponsiveReactGridLayout
        {...this.props}
        breakpoints={{lg: 900, md: 600, sm: 0}}
        autoSize={true}
        isDraggable={edit}
        isResizable={edit}
        layouts={layouts}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
      >
      {_.map(layouts[currentBreakpoint], function(layout, i) {
        return <div id={"widget-" + layout.i} key={i}>
        <Widget
          layout={layout}
          collapsed={collapsed[layout.i]}
          edit={edit}
          currentBreakpoint={currentBreakpoint}
          onWidgetResize={self.onWidgetResize}
          onWidgetCollapse={self.onWidgetCollapse}
          rowHeight={rowHeight}
        /></div>
      })}
      </ResponsiveReactGridLayout>
    </div>
  }
}
