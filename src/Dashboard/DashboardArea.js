import React from 'react'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { DropTarget } from 'react-dnd'
import Widget from '../Widget/Widget'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardArea extends React.Component {

  static defaultProps = {
    cols: { lg: 12, md: 3, sm: 1},
    rowHeight: 30
  };

  constructor(props) {
    super(props)
    this.state = {
      compactType: "vertical",
      mounted: false,
      widgets: [{
        i: "0",
        type: "ekspandertBartWidget",
        options: {
          title: "Here is widget ABC",
          collapsed: false
        }
      }, {
        i: "1",
        type: "ekspandertBartWidget",
        options: {
          title: "Here is widget DEF",
          collapsed: true
        }
      }, {
        i: "2",
        type: "ekspandertBartWidget",
        options: {
          title: "Here is widget GHI",
          collapsed: true
        }
      }, {
        i: "3",
        type: "invalidWidget",
        options: {
          title: "Here is widget JKL",
          collapsed: true
        }
      }],
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
    this.onWidgetUpdate = this.onWidgetUpdate.bind(this)
    this.onWidgetDelete = this.onWidgetDelete.bind(this)
    this.onWidgetAdd = this.onWidgetAdd.bind(this)
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  setLayouts = layouts => {
    this.setState({
      layouts: layouts
    })
  }

  setWidgets = widgets => {
    this.setState({
      widgets: widgets
    })
  }

  onWidgetAdd = (what) => {
    let newWidgets = _.cloneDeep(this.state.widgets)
    let countWidgets = Object.keys(newWidgets).length
    newWidgets = newWidgets.concat({
      i: countWidgets.toString(),
      type: "new widget",
      options: {}
    })

    let newLayouts = _.cloneDeep(this.state.layouts)
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = newLayouts[breakpoint].concat({
        i: countWidgets.toString(),
        x: 0,
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      })
    })

    this.setState({
      widgets: newWidgets,
      layouts: newLayouts
    })
  }

  onWidgetUpdate = (update, layout) => {
    let newWidgets = _.cloneDeep(this.state.widgets)
    this.setWidgets(newWidgets.map((widget) => {
      if (widget.i === layout.i) {
        return update
      } else {
        return widget
      }
    }))
  }

  onWidgetResize = layout => {
    let newLayout = _.cloneDeep(this.state.layouts)
    let index = _.findIndex(newLayout[this.props.currentBreakpoint], {"i" : layout.i})
    newLayout[this.props.currentBreakpoint][index] = layout
    this.setLayouts(newLayout)
  }

  onWidgetDelete = layout => {
    let newWidgets = _.cloneDeep(this.state.widgets)
    newWidgets = _.reject(newWidgets, {"i" : layout.i})
    newWidgets = newWidgets.map((widget, i) => {
      widget.i = i.toString()
      return widget
    })

    let newLayout = _.cloneDeep(this.state.layouts)
    Object.keys(newLayout).forEach(breakpoint => {
      newLayout[breakpoint] = _.reject(newLayout[breakpoint], {"i": layout.i})
      // resort layout ids in a sequential order, it is mandatory
      newLayout[breakpoint] = newLayout[breakpoint].map((layout, i) => {
        layout.i = i.toString()
        return layout
      })
    })

    this.setLayouts(newLayout)
    this.setWidgets(newWidgets)
  }

  onBreakpointChange = breakpoint => {
    this.props.onBreakpointChange(breakpoint)
  };

  onLayoutChange = (layout, layouts) => {
    this.setLayouts(layouts)
  };

  render() {

    const { rowHeight, edit, currentBreakpoint } = this.props
    const { widgets, compactType, layouts, mounted } = this.state
    let self = this

    if (!mounted) {
      return <div>Wait</div>
    }
    return this.props.connectDropTarget(<div>
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
      draggableHandle={'.draggableHandle'}
    >
    {_.map(layouts[currentBreakpoint], function(layout, i) {
      return <div id={"widget-" + layout.i} key={i}>
      <Widget
        layout={layout}
        widget={widgets[layout.i]}
        edit={edit}
        currentBreakpoint={currentBreakpoint}
        onWidgetResize={self.onWidgetResize}
        onWidgetUpdate={self.onWidgetUpdate}
        onWidgetDelete={self.onWidgetDelete}
        rowHeight={rowHeight}
      /></div>
    })}
    </ResponsiveReactGridLayout>
    </div>)
  }
}

export default DropTarget(
  ['dashboard'],
  {
    canDrop: props => {
      console.log("I am DashboardArea, you can drop here")
      return true
    },
    drop: (props, monitor, component) => {
      console.log("Something good dropped")
      let item = monitor.getItem()
      component.onWidgetAdd(item)
    },
    hover: props => {
      console.log("Something good is hovering")
    }
  },
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }
  },
)(DashboardArea)
