import React, { useEffect, useRef, useState } from "react";

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

const BookmarkMaps = ({dataFromChild, latlng}) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [ libraries ] = useState(['places']);
  // const [directionResponse, setDirectionResponse] = useState(null)
  // const [distance, setDistance] = useState("")
  // const [duration, setDuration] = useState("")

  const [autocomplete, setAutocomplete] = useState(null)
  const [markerLoc, setMarkerLoc] = useState()
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [formattedAddress, setFormattedAddress] = useState('')
  const [addressName, setAddressName] = useState('')
  const [center, setCenter] = useState(
    {
      lat: -6.1722143,
      lng: 106.7657932
    }
  )

  

  useEffect(() => {
    dataFromChild({
      formattedAddress,
      latitude,
      longitude
    })
  }, [formattedAddress])
  
  useEffect(() => {
    if(latlng !== undefined) {
      setCenter(latlng)
    }
  }, [latlng])

  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  if(!isLoaded) {
    return (
      <h1>Please wait...</h1>
    )
  }

  // Geocode
  const loadAutocomplete = (e) => {
    setAutocomplete(e)
  }

  const placeChanged = (e) => {
    if (autocomplete !== null) {
      const address = autocomplete.getPlace().formatted_address
      const lat = autocomplete.getPlace().geometry.location.lat()
      const lng = autocomplete.getPlace().geometry.location.lng()
      setLatitude(lat)
      setLongitude(lng)
      setFormattedAddress(address)
      setCenter({
        lat,
        lng
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  // Reverse Geocode
  const dragEnd = (e) => {
    /* eslint-disable */
    const geocoder = new google.maps.Geocoder()
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setLatitude(lat)
    setLongitude(lng)
    const latlng = {
      lat,
      lng
    }
    geocoder.geocode({location: latlng})
      .then((response) => {
        setFormattedAddress(response.results[0].formatted_address)
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

  return (
    // <div style={{positon: 'relative'}}>
    <div style={{positon: 'relative'}}>
      {/* <div className="maps" style={{width: '100%', height: '100%'}}> */}
      <div className="maps">
        <GoogleMap 
          center={center}
          zoom={14}
          mapContainerStyle={{width: '100%', height: '100%', borderRadius: '1.5rem'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker 
            position={center}
            draggable={true}
            onDragEnd={dragEnd}
          />
        </GoogleMap>
      </div>
      <form 
        className="input-address"
      > 
        <Autocomplete
          // className="input-address"
          onLoad={loadAutocomplete}
          onPlaceChanged={placeChanged}
          restrictions={ {country: ['id'] }}
        >
          <input type="text" id="address" />
        </Autocomplete>
      </form>
    </div>
  )
}

export default BookmarkMaps