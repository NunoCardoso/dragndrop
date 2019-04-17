import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Dashboard/Dashboard'

export default class App extends React.Component {
  render () {
    return <div>
      <h3 className='p-2'>Dashboard demo</h3>
      <Dashboard />
    </div>
  }
}
