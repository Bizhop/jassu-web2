import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './shared/Header'
import DashContainer from './dash/DashContainer'
import KirvesContainer from './kirves/KirvesContainer'
import KirvesGame from './kirves/KirvesGame'

const NotFound = () => (
  <div className="container">
    <div className="jumbotron">
      <h1>Page not Found 404!</h1>
    </div>
  </div>
)

const MyRoutes = () => (
  <div className="container pt-5">
    <Routes>
      <Route exact path="/" element={<DashContainer />} />
      <Route exact path="/kirves" element={<KirvesContainer />} />
      <Route exact path="/kirves/:id" element={<KirvesGame />} />
      <Route element={NotFound} />
    </Routes>
  </div>
)

const App = () => (
  <div className="app">
    <Header />
    <MyRoutes />
  </div>
)

export default App
