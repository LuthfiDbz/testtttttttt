import React, { useRef, useState } from "react";

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, Polyline, InfoBox, InfoWindow, OverlayView } from '@react-google-maps/api'
import PickupIcon from '../../assets/icon/ic-location-blue.png'
import DropIcon from '../../assets/icon/ic-location-yellow.png'
import DriverIcon from '../../assets/icon/ic-driver-loc.png'
import { useEffect } from "react";

const DriverLocMaps = ({tripData, driverLatLng}) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [ libraries ] = useState(['places']);
  const [directionResponse, setDirectionResponse] = useState(null)
  const [location, setLocation] = useState([])
  const [directionPolyline, setDirectionPolyline] = useState([])
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")

  useEffect(() => {
    let locs = []
    let direct = []
    tripData.map((loc) => {
      const a = {
        job: loc.job,
        location: {
          lat: loc.location[1],
          lng: loc.location[0],
        }
      }
      const b = {
        lat: loc.location[1],
        lng: loc.location[0],
      }
      locs.push(a)
      direct.push(b)
    })
    setLocation(locs)
    setDirectionPolyline(direct)
  }, [tripData])

  const options = {
    strokeColor: '#1F83BB',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: '#1F83BB',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    // paths: [
    //   {lat: 37.772, lng: -122.214},
    //   {lat: 21.291, lng: -157.821},
    //   {lat: -18.142, lng: 178.431},
    //   {lat: -27.467, lng: 153.027}
    // ],
    zIndex: 1
  };

  const infoBoxOptions = { closeBoxURL: '', enableEventPropagation: true };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  if(!isLoaded) {
    return null
  }

  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };

  const divStyle = {
    backgroundColor: `red`,
    border: `1px solid #ccc`,
    padding: 15,
    marginBottom: '2rem',

  }

  return (
    <div style={{positon: 'relative', borderRadius: '0.5rem'}}>
      <div className="maps" style={{width: '100%', height: '45vh'}}>
        <GoogleMap 
          center={{
            lat: driverLatLng[1],
            lng: driverLatLng[0]
          }}
          zoom={15}
          mapContainerStyle={{width: '100%', height: '100%',borderRadius: '0.5rem'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker 
            position={{
              lat: driverLatLng[1],
              lng: driverLatLng[0]
            }}
            icon={DriverIcon}
            // label={DriverIcon}
            // icon={
            //   {
            //       // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            //       url: DriverIcon,
            //       scale: 10,
            //       fillOpacity: 0,
            //       rotation: 180
            //   }
            // }
          />
          {location.map((loc,index) => {
            return (
              loc.job === 'pickup' ? 
                <>
                  <Marker 
                    position={loc.location}
                    icon={PickupIcon}
                  />
                  {/* <InfoWindow
                    position={loc.location}
                  >
                    <div style={divStyle}>
                      <h1>InfoWindow</h1>
                    </div>
                  </InfoWindow> */}
                  <OverlayView position={loc.location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: '0.1rem 0.3rem',
                        position: 'relative',
                        top: '-3.2rem',
                        left: '-0.55rem',
                        borderRadius: '50%',
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                        fontWeight: '700',
                        fontSize:'0.75rem'
                      }}
                    >
                      1
                    </div>
                  </OverlayView>
                </>
                :
                <>
                  <Marker 
                    position={loc.location}
                    icon={DropIcon}
                    // icon={
                    //   {
                    //       // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    //       url: DropIcon,
                    //       scale: 10,
                    //       fillOpacity: 0,
                    //       rotation: 180
                    //   }
                    // }
                  />
                  <OverlayView position={loc.location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: '0.1rem 0.3rem',
                        position: 'relative',
                        top: '-3.2rem',
                        left: '-0.55rem',
                        borderRadius: '50%',
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                        fontWeight: '700',
                        fontSize:'0.75rem'
                      }}
                    >
                      {index + 1}
                    </div>
                  </OverlayView>
                </>
                
            )
          })}
          {/* <Polyline
            onLoad={onLoad}
            path={directionPolyline}
            options={options}
          /> */}
        </GoogleMap>
      </div>
    </div>
  )
}

export default DriverLocMaps