import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./Dashboard.css"
import "./nav.css"
import "./hacks.css"

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ReactResizeDetector from 'react-resize-detector';
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
    collapse: {
      "0": false,
      "1": true,
      "2": true,
      "3": true
    },
    sizes: { lg: [], md: [], sm: []},
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
    this.setState({ mounted: true });
  }

  onEditChange () {
    let sizes = _.cloneDeep(this.state.sizes)
    if (!this.state.edit) {
      sizes[this.state.currentBreakpoint] = this.state.layouts[this.state.currentBreakpoint].map(widget => {
        return {
          width: document.getElementById("widget-" + widget.i).offsetWidth,
          height: document.getElementById("widget-" + widget.i).offsetHeight
        }
      })
    }
    this.setState({
      edit: !this.state.edit,
      sizes: sizes
    })
  }

  onWidgetResizeDetected (i, width, height) {
    console.log("ON RESIZE ", width, height, i)
    let newLayout = _.cloneDeep(this.state.layouts)
    let newSizes = _.cloneDeep(this.state.sizes)
    let index = _.findIndex(newLayout[this.state.currentBreakpoint], {"i" : i})
    let element = newLayout[this.state.currentBreakpoint][index]
    element.h =  Math.ceil((height + 50) / this.props.rowHeight)
    newLayout[this.state.currentBreakpoint][index] = element
    element.height = element.h * this.props.rowHeight
    element.width = width
    newSizes[this.state.currentBreakpoint][index] = {
      width: document.getElementById("widget-" + i).offsetWidth,
      height: document.getElementById("widget-" + i).offsetHeight
    }
    this.setState({
      layouts: newLayout,
      sizes: newSizes
    })
  }

  onWidgetCollapseClick (index) {
    console.log(index)
    let newCollapse = _.cloneDeep(this.state.collapse)
    newCollapse[index] = !newCollapse[index]
    this.setState({
      collapse: newCollapse
    })
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.setState({
       layouts: layouts
    })
  };

  onWidgetEditClick(e) {
    console.log(e)
  }

  render() {
    if (!this.state.mounted) {
      return <div>Wait</div>
    }
    var self = this
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
       return <div id={"widget-" + l.i} key={i}>
         <span className="text">{i}</span>
         {self.state.edit ? <div className="EditLayout" style={{
           backgroundColor: "rgba(255,255,255,0.7)",
           width: self.state.sizes[self.state.currentBreakpoint][i].width,
           height: self.state.sizes[self.state.currentBreakpoint][i].height,
           position: "absolute",
           zIndex: 2,
           textAlign: "center",
           lineHeight: self.state.sizes[self.state.currentBreakpoint][i].height + "px"
         }}
         onClick={self.onWidgetEditClick.bind(self)}>
         Editing
         </div> : null}
         <Ekspanderbartpanel apen={!self.state.collapse[l.i]} tittel="Klikk her for å åpne/lukke panelet" onClick={self.onWidgetCollapseClick.bind(self, l.i)}>
           <div>
           <ReactResizeDetector handleWidth handleHeight onResize={self.onWidgetResizeDetected.bind(self, l.i)}/>
           {self.state.collapse[l.i] ? null : <div> Panelet vil da ekspandere og vise innholdet.<br/>
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
     })}
      </ResponsiveReactGridLayout>
    </div>
  }
}
