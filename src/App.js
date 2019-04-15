import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./App.css"
import "./nav.css"
import "./hacks.css"

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Resizable from 'react-component-resizable';
import ReactResizeDetector from 'react-resize-detector';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class App extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 12, md: 3, sm: 1},
    collapse: {
      "0": false,
      "1": true,
      "2": true,
      "3": true
    },
    initialLayout: {
      lg: [
        {x: 0, y: 0, w: 8, h: 4, i: "0"},
        {x: 8, y: 0, w: 4, h: 4, i: "1"},
        {x: 0, y: 4, w: 8, h: 4, i: "2"},
        {x: 8, y: 4, w: 4, h: 4, i: "3"}
      ],
      md: [
        {x: 0, y: 0, w: 2, h: 4, i: "0"},
        {x: 2, y: 0, w: 1, h: 4, i: "1"},
        {x: 0, y: 4, w: 2, h: 4, i: "2"},
        {x: 2, y: 4, w: 1, h: 4, i: "3"}
      ],
      sm: [
        {x: 0, y: 0, w: 2, h: 4, i: "0"},
        {x: 2, y: 0, w: 1, h: 4, i: "1"},
        {x: 0, y: 4, w: 2, h: 4, i: "2"},
        {x: 2, y: 4, w: 1, h: 4, i: "3"}
      ]
    }
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: this.props.initialLayout,
    collapse: this.props.collapse
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onResize (i, width, height) {
    console.log("ON RESIZE ", width, height, i)
    let newLayout = _.cloneDeep(this.state.layouts)
    let index = _.findIndex(newLayout[this.state.currentBreakpoint], {"i" : i})
    let element = newLayout[this.state.currentBreakpoint][index]
    if (Math.ceil((height + 40) / this.props.rowHeight) !== element.h) {
      console.log("Changing from " + JSON.stringify(element))
      element.h =  Math.ceil((height + 40) / this.props.rowHeight)
      newLayout[this.state.currentBreakpoint][index] = element
      console.log("to " + JSON.stringify(element))
      this.setState({
        layouts: newLayout
      })
    }
  }

  expand (i, e) {
    console.log(i)
    let newCollapse = _.cloneDeep(this.state.collapse)
    newCollapse[i] = !newCollapse[i]
    this.setState({
      collapse: newCollapse
    })
  }

  generateDOM() {
    let self = this
    return _.map(this.state.layouts[this.state.currentBreakpoint], function(l, i) {
      return <div key={i}>
        <span className="text">{i}</span>
        <Ekspanderbartpanel apen={!self.state.collapse[l.i]} tittel="Klikk her for å åpne/lukke panelet" onClick={self.expand.bind(self, l.i)}>
          <div>
          <ReactResizeDetector handleWidth handleHeight onResize={self.onResize.bind(self, l.i)}/>
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
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical" ? null : "horizontal";
    this.setState({ compactType });
  };

  onLayoutChange = (layout, layouts) => {
    console.log("layout", layout)
    console.log("layouts", layouts)
    this.setState({
       layouts: layouts
    })
  };

  render() {
    if (!this.state.mounted) {
      return <div>Wait</div>
    }
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>
        <ResponsiveReactGridLayout
          breakpoints={{lg: 900, md: 600, sm: 0}}
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
