import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./App.css"
import "./nav.css"
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class App extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    //cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 },
    initialLayout: [
      {x: 0, y: 0, w: 2, h: 4, i: "0"},
      {x: 2, y: 0, w: 1, h: 4, i: "1"},
      {x: 0, y: 4, w: 2, h: 4, i: "2"},
      {x: 2, y: 4, w: 1, h: 4, i: "3"}
      ]
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.initialLayout }
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  doubleLayoutChange(e) {
    console.log(e.target)
    this.setState({
      layouts: {lg: [
        {x: 0, y: 0, w: 2, h: 8, i: "0"},
        {x: 2, y: 0, w: 1, h: 8, i: "1"},
        {x: 0, y: 4, w: 2, h: 8, i: "2"},
        {x: 2, y: 4, w: 1, h: 8, i: "3"}
        ]
    }
  })
  }

  generateDOM() {
    let self = this
    return _.map(this.state.layouts.lg, function(l, i) {
      return <div key={i}>
        <span className="text">{i}</span>
        <Ekspanderbartpanel tittel="Klikk her for å åpne/lukke panelet"
        onClick={self.doubleLayoutChange.bind(self)}>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
    Panelet vil da ekspandere og vise innholdet.<br/>
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
  };

  render() {
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
