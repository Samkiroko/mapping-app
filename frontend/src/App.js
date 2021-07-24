import { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import { format } from 'timeago.js'
import './app.css'

function App() {
  const currentUsername = 'john'
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 8,
    longitude: 34,
    zoom: 4,
  })

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        setPins(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getPins()
  }, [])

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat
    setNewPlace({
      lat: latitude,
      long: longitude,
    })
  }

  return (
    <div className='App'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle='mapbox://styles/samkiroko/ckrhfb4wq6bdj17qyhlkkf1ja'
        onDblClick={handleAddClick}
        transitionDuration='200'>
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}>
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: currentUsername === p.username ? 'tomato' : 'slateblue',
                  cursor: 'pointer',
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor='left'>
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place'>{p.title}</h4>
                  <label>Review</label>
                  <p className='desc'>{p.desc}</p>
                  <label>Rating</label>
                  <div className='stars'>{Array(p.rating).fill(<Star className='star' />)}</div>
                  <label>Information</label>
                  <span className='username'>
                    Created by <b>{p.username}</b>
                  </span>
                  <span className='date'>{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}>
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: 'tomato',
                  cursor: 'pointer',
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor='left'>
              {/* <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input placeholder='Enter a title' autoFocus onChange={(e) => setTitle(e.target.value)} />
                  <label>Description</label>
                  <textarea
                    placeholder='Say us something about this place.'
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <button type='submit' className='submitButton'>
                    Add Pin
                  </button>
                </form>
              </div> */}
            </Popup>
          </>
        )}
      </ReactMapGL>
    </div>
  )
}

export default App
