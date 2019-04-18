export default [{
  type: 'ekspandertbart',
  title: 'Ekspandertbart widget',
  description: 'Widget that can collapse',
  layout: {
    lg: {minW: 6, maxW: 12, minH: 3, defaultW: 6, defaultH: 6, maxH: Infinity},
    md: {minW: 2, maxW: 3,  minH: 3, defaultW: 2, defaultH: 3, maxH: Infinity},
    sm: {minW: 1, maxW: 1,  minH: 3, defaultW: 1, defaultH: 3, maxH: Infinity}
  },
  options: {
    collapsed: false,
  }
}, {
  type: 'panel',
  title: 'Panel widget',
  description: 'Widget that is a basic panel',
  layout: {
    lg: {minW: 2, maxW: 12, minH: 3, defaultW: 3, defaultH: 3, maxH: Infinity},
    md: {minW: 1, maxW: 3,  minH: 3, defaultW: 1, defaultH: 3, maxH: Infinity},
    sm: {minW: 1, maxW: 1,  minH: 3, defaultW: 1, defaultH: 3, maxH: Infinity}
  },
  options: {}
}, {
  type: 'smiley',
  title: 'Smiley widget',
  description: 'Widget with a 😀',
  layout: {
    lg: {minW: 2, maxW: 3, minH: 5, defaultW: 2, defaultH: 5, maxH: Infinity},
    md: {minW: 1, maxW: 3, minH: 5, defaultW: 1, defaultH: 5, maxH: Infinity},
    sm: {minW: 1, maxW: 1, minH: 5, defaultW: 1, defaultH: 5, maxH: Infinity},
  },
  options: {}
}, {
  type: 'cat',
  title: 'Cat widget',
  description: 'A 🐈 in a widget',
  layout: {
    lg: {minW: 4, maxW: 6, minH: 5, defaultW: 4, defaultH: 5, maxH: Infinity},
    md: {minW: 2, maxW: 3, minH: 5, defaultW: 2, defaultH: 5, maxH: Infinity},
    sm: {minW: 1, maxW: 1, minH: 5, defaultW: 1, defaultH: 5, maxH: Infinity},
  },
  options: {}
}]
