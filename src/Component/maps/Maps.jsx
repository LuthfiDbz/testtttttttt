import React, { useEffect, useRef, useState } from "react";

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

const Maps = ({address, driverLatLng}) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [ libraries ] = useState(['places']);
  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")

  const [center2, setCenter2] = useState({
    lat: -6.175110,
    lng: 106.865036
  })

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  const center = {
    lat: -6.175110,
    lng: 106.865036
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  useEffect(() => {
    // console.log(driverLatLng)
  }, [driverLatLng])

  if(!isLoaded) {
    return (
      <h1>Please wait...</h1>
    )
  }


  const calculateRoute = async (e) => {
    e.preventDefault()
    // if(originRef.current.value === '' || destinationRef.current.value === '') {
    //   return
    // }

    // console.log(originRef.current.value)
    // console.log(driverLatLng)
    
    /* eslint-disable */
    const directionsService = new google.maps.DirectionsService()
    const result =  await directionsService.route({
      origin: new google.maps.LatLng(driverLatLng[1], driverLatLng[0]),
      destination: new google.maps.LatLng(-6.620406, 106.816415),
      // origin: originRef.current.value,
      // destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })

    // console.log(result)
    setDirectionResponse(result)
    setDistance(result.routes[0].legs[0].distance.text)
    setDuration(result.routes[0].legs[0].duration.text)
  }

  const clearRoute = (e) => {
    e.preventDefault()
    setDirectionResponse(null)
    setDistance("")
    setDuration("")
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  const geocoder = new google.maps.Geocoder()

  return (
    <div style={{positon: 'relative'}}>
      <div className="maps" style={{width: '30vw', height: '30vh'}}>
        <GoogleMap 
          center={center2}
          zoom={15}
          mapContainerStyle={{width: '100%', height: '100%'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker 
            position={center2}
            draggable={true}
          />
          {directionResponse && <DirectionsRenderer directions={directionResponse} options={{ suppressMarkers: true }}/>}
        </GoogleMap>
      </div>
      <form style={{
        position:'absolute',
        top: 0,
        backgroundColor: "black",
        color: 'white',
        padding: '20px',
        zIndex: 999
      }}> 
        <label htmlFor="from">From</label>
        <Autocomplete>
          <input type="text" id="origin" ref={originRef}/>
        </Autocomplete>
        <label htmlFor="to">To</label>
        <Autocomplete>
          <input type="text" id="destination" ref={destinationRef}/>
        </Autocomplete>
        <button type="submit" onClick={calculateRoute}>Go</button><br />
        <button type="submit" onClick={clearRoute}>Reset</button><br />
        <h4>Distance: <span className="distance-content"></span>{distance}</h4> 
        <h4>Duration: <span className="duration-content"></span>{duration}</h4>
        <button onClick={(e) => {e.preventDefault(); map.panTo(center)}}>{`{o}`}</button>
      </form>
    </div>
  )
}

export default Maps