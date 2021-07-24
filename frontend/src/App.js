import { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 8,
    longitude: 34,
    zoom: 4,
  })

  return (
    <div className='App'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
        <Marker latitude={1.2887} longitude={36.8231} offsetLeft={-20} offsetTop={-10}>
          <div>You are here</div>
        </Marker>
      </ReactMapGL>
    </div>
  )
}

export default App
