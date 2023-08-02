import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useJsApiLoader, GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { Badge, Button, ButtonGroup, } from "reactstrap";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from "axios";
import { addDays, format, isSameDay, subDays } from "date-fns";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactGA from "react-ga4";


// Asset
import Logo from "../assets/img/logo.png";
import RemoveIcon from '../assets/icon/ic-remove.png'
import ToggleIcon from '../assets/icon/ic-chevron-right.png'
import AddIcon from '../assets/icon/ic-add-green.png'
import CheckIcon from '../assets/icon/ic-invoice-paid.png'
import ConfirmIcon from '../assets/img/img-state-confirmation.png'
import LocationTooFarIcon from '../assets/img/location-toofar.png'
import SamedayIconActive from '../assets/icon/ic-service-sameday-active.png'
import SamedayIcon from '../assets/icon/ic-service-sameday-inactive.png'
import InstantIconActive from '../assets/icon/ic-service-instant-active.png'
import InstantIcon from '../assets/icon/ic-service-instant-inactive.png'
import BikeIconActive from '../assets/icon/ic-vehicle-bike-active.png'
import BikeIcon from '../assets/icon/ic-vehicle-bike-inactive.png'
import L300IconActive from '../assets/icon/ic-vehicle-3-wheel-active.png'
import L300Icon from '../assets/icon/ic-vehicle-3-wheel-inactive.png'
import CDEIconActive from '../assets/icon/ic-vehicle-car-active.png'
import CDEIcon from '../assets/icon/ic-vehicle-car-inactive.png'
import CDDIconActive from '../assets/icon/ic-vehicle-truck-active.png'
import CDDIcon from '../assets/icon/ic-vehicle-truck-inactive.png'
import FUSOIconActive from '../assets/icon/ic-vehicle-truck-active.png'
import FUSOIcon from '../assets/icon/ic-vehicle-truck-inactive.png'

import PickupIcon from '../assets/icon/ic-location-blue.png'
import DropIcon from '../assets/icon/ic-location-yellow.png'
import GrayIcon from '../assets/icon/ic-location-gray.png'
import SearchIcon from '../assets/icon/ic-search.png'
import SavedAddressIcon2 from '../assets/icon/ic-input-saved-address.png'
import SavedAddressIcon from '../assets/icon/ic-select-bookmark.png'
import ImportIcon from '../assets/icon/ic-import.png'
import CalendarIcon from '../assets/icon/ic-calendar-input.png'
import TimeIcon from '../assets/icon/ic-time-input.png'
import SuccessIcon from '../assets/icon/ic-invoice-paid@2x.png'
import ArrowHideIcon from '../assets/icon/ic-arrow-left.png'
import HomeIcon from '../assets/icon/ic-home.png'

// Style
import "../styles/deliveryService/deliveryService.scss";
import '../styles/deliveryService/createOrder/createOrder.scss'
import { AuthContext } from "../Component/authContext/AuthContext";
import { InputSavedAddress } from "../Component/UI/modal/Delivery/InputSavedAddress";
import { ImportOrder } from "../Component/UI/modal/Delivery/ImportOrder";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { numberFormat } from "../Component/numberFormat/numberFormat";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Header } from "../Component/header/Header";
import { Helmet } from "react-helmet";


const optionTime = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
// let optionTime = []
const optionTime2HoursAgo = ['04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00']

// let tm2 = []

// for (let i = 6; i <= 16; i++) {
//   if(i >= 10) {
//     optionTime.push(`${i}:00`)
//     tm2.push(`${i - 2}:00`)
//   } else {
//     optionTime.push(`0${i}:00`)
//     tm2.push(`0${i - 2}:00`)
//   }
//   if(i !== 16) {
//     i >= 10 ? 
//       optionTime.push(`${i}:30`) 
//       : 
//       optionTime.push(`0${i}:30`)
//   }
// }

// console.log(tm2)

export const DeliveryService = () => {
  // * VARIABLE / STATE
  // Auth
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors }
  } = useForm();
  const url = process.env.REACT_APP_URL_CUST
  const url_auth = process.env.REACT_APP_DEV_URL
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }
  const auth = useContext(AuthContext)

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const drftNum = searchParams.get('drftNum')
  const reorder = searchParams.get('ro')
  const locState = useLocation()
  const [index, setIndex] = useState(1)
  // const [index, setIndex] = useState(idx)
  // const [id, setId] = useState(1)
  const [point, setPoint] = useState('Pick')
  const [selectedService, setSelectedService] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [services, setServices] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [middleMileVehicles, setmiddleMileVehicles] = useState([])
  const [isBike, setIsBike] = useState("");
  const [additionalList, setAdditionalList] = useState([])
  const [promoCode, setPromoCode] = useState('')
  const [orderAllow, setOrderAllow] = useState(false)

  // ID
  // const [pickId, setPickId] = useState(0)
  // const [targetPickId, setTargetPickId] = useState(0)
  const [pickList, setPickList] = useState([])

  const [locationId, setlocationId] = useState(0)
  const [targetLocationId, setTargetLocationId] = useState(0)
  const [location, setLocation] = useState([])
  const [recentLocation, setRecentLocation] = useState([])
  const [locViewType, setLocViewType] = useState(0)
  const [locationError, setLocationError] = useState(false)

  const [dropList, setDropList] = useState([])

  const [itemId, setItemId] = useState(0)
  const [targetItemId, setTargetItemId] = useState(0)
  const [itemList, setItemList] = useState([])

  const [orderId, setOrderId] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [serviceNameId, setServiceNameId] = useState('')
  const [datePick, setDatePick] = useState(new Date())
  const [currentDate, setCurrentDate] = useState('')
  const [minDate, setMinDate] = useState('')
  const [instantTimePick, setInstantTimePick] = useState('')
  const [timePick, setTimePick] = useState('pick-time')
  const [currenttime, setCurrenttime] = useState('')
  const [vehicleTypeId, setVehicleTypeId] = useState('')
  const [bikeId, setBikeId] = useState('')
  const [additionalService, setAdditionalService] = useState([])
  const [extraService, setExtraService] = useState([])
  const [isCustomeSize, setIsCustomeSize] = useState(false)

  // Sender Receiver State
  const [pointLabel, setPointLabel] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSaveBookmark, setIsSaveBookmark] = useState(false)
  const [bookmarkLabel, setBookmarkLabel] = useState('')
  const [bookmarkReload, setBookmarkReload] = useState(true)
  const isbookmarkref = useRef()

  // Packages State
  const [packagesList, setPackagesList] = useState([])
  const [isOtherPackages, setIsOtherPackages] = useState(false)
  const [packageCategory, setPackageCategory] = useState('')
  const [packageSize, setPackageSize] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [weight, setWeight] = useState('')
  const [lenght, setLenght] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [temperature, setTemperature] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [tempInput, setTempInput] = useState('')

  // Toggle
  const [detailOpen, setDetailOpen] = useState(false)
  const [toggleShow, setToggleShow] = useState(false)
  const [additional, setAdditional] = useState(true);
  const [showHideService, setShowHideService] = useState(false)
  const [openImportOrder, setOpenImportOrder] = useState(false);
  const toggleImportOrder = () => {
    setOpenImportOrder(!openImportOrder)
  }

  const [openSavedAddress, setOpenSavedAddress] = useState(false);
  const toggleSavedAddress = (targetId) => {
    if (targetId !== targetLocationId) {
      setTargetLocationId(targetLocationId)
    } else {
      setTargetLocationId(targetId)
    }
    setOpenSavedAddress(!openSavedAddress)
  }


  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [formattedAddress, setFormattedAddress] = useState('')
  const [center, setCenter] = useState({
    lat: -6.1722143,
    lng: 106.7657932
  })
  const [loadingMapScreen, setLoadingMapScreen] = useState(false)
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [libraries] = useState(['places']);

  setInterval(() => {
    const currentdate = new Date
    setCurrenttime(format(Date.parse(currentdate), 'HH:mm'))
  }, 1000);

  // * FUNCTION
  // Initial Render
  useEffect(() => {
    getAllData()
    const currentdate = new Date
    const fiveminuteslater = currentdate.getTime() + 300 * 1000
    setCurrentDate(currentdate)
    setInstantTimePick(format(Date.parse(currentdate), 'HH:mm'))
  }, [])

  const transferAllDraftData = async (draftData, itemList) => {
    const name = draftData.service_name.name.toLowerCase().split(' ').join('-')
    setSelectedService(name)
    setServiceNameId(draftData.serviceNameId)

    const currentdate = new Date
    setDatePick(draftData.service_name.name.toLowerCase() === 'instant delivery' ? currentdate : new Date(draftData.datePick))
    setMinDate(currentdate)
    setTimePick(draftData.timePick)

    setSelectedVehicle(draftData.vehicle_type.name)
    setVehicleTypeId(draftData.vehicleTypeId)
    setIsBike(draftData.vehicle_type.name)
    if (draftData.service_name.name.toLowerCase() !== 'superkul truck') {
      // Check input ceklis motor
      // 
      // Additional
      // 
      setAdditionalService(draftData.rawData.additionalService)

      if (isSameDay(new Date(draftData.datePick), new Date()) && draftData.service_name.name.toLowerCase() === 'sameday delivery') {
        const timepickvalue = format(Date.parse(currentdate), 'HH:mm')
        const findtime = optionTime2HoursAgo.findIndex((opt, index) => {
          return opt >= timepickvalue
        })
        setTimePick(optionTime[findtime])
      }

      try {
        const response = await axios.get(`${url}/api/additional-service`, { headers })
        const data = response.data.data
        const addArray = new Array(data.length).fill(false)
        let addIndex = []
        const additional = data.map((e, index) => {
          let check = false
          draftData.rawData.additionalService.map(raw => {
            if (raw.id === e.id) {
              check = true
            }
          })
          addIndex.push(check)
        })
        setSelectedAdditional(addIndex)
      } catch (error) {
        console.log(error.message)
      }



      let transferLocation = []
      let locId = 0
      let itmId = 0


      draftData.rawData.pickUp.map(((loc) => {

        let dropLoc = []
        const pickLoc = {
          point: 'Pick',
          locationId: locId,
          notes: loc.notes,
          name: loc.senderName,
          phoneName: loc.pickPhoneName === null ? loc.senderName : loc.pickPhoneName,
          phoneNumber: loc.pickPhoneNumber.substring(2),
          addressName: loc.pickLabel === null ? loc.pickAddress : loc.pickLabel,
          addressFormat: loc.pickAddress,
          addressLabel: loc.pickLabel === null ? loc.pickAddress : loc.pickLabel,
          lnglat: loc.pickLocation,
          latlng: {
            lat: loc.pickLocation[1],
            lng: loc.pickLocation[0],
          },
          itemId: '',
          item: []
        }
        loc.item.map((item) => {
          locId += 1
          itmId += 1
          const checkItem = itemList.find((list) => {
            return list.name.toLowerCase() === item.itemCategory.toLowerCase()
          })
          const findSize = sizeData.find((size) => item.weight == size.weight && item.width == size.width && item.lenght == size.lenght && item.height == size.height)
          setIsCustomeSize(false)
          findSize ? setPackageSize(findSize.name) : setIsCustomeSize(true)
          const drop = {
            point: 'Drop',
            locationId: locId,
            notes: item.dropOff.dropNotes,
            name: item.dropOff.receiverName,
            phoneName: item.dropOff.dropPhoneName === null ? item.dropOff.receiverName : item.dropOff.dropPhoneName,
            phoneNumber: item.dropOff.dropPhoneNumber.substring(2),
            addressName: item.dropOff.dropLabel === null ? item.dropOff.dropAddress : item.dropOff.dropLabel,
            addressFormat: item.dropOff.dropAddress,
            addressLabel: item.dropOff.dropLabel === null ? item.dropOff.dropAddress : item.dropOff.dropLabel,
            lnglat: item.dropOff.dropLocation,
            latlng: {
              lat: item.dropOff.dropLocation[1],
              lng: item.dropOff.dropLocation[0],
            },
            itemId: itmId,
            item: {
              itemId: itmId,
              packageCategory: checkItem === undefined ? "Lainnya" : item.itemCategory,
              itemDesc: checkItem === undefined ? item.itemCategory : "",
              weight: item.weight,
              lenght: item.lenght,
              width: item.width,
              height: item.height,
              temperature: item.itemTmp,
              quantity: item.itemQty,
            },
          }
          dropLoc.push(drop)
        })
        locId += 1
        transferLocation.push(pickLoc)
        dropLoc.map((drop) => {
          transferLocation.push(drop)
        })
        setCenter(pickLoc.latlng)
      }))
      setLocation(transferLocation)
      setlocationId(locId + 1)
      setTargetLocationId(locId + 1)
      setItemId(itmId + 1)
      setTargetItemId(itmId + 1)

    } else {
      setMinDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      let transferLocation = []
      let locId = 0
      let itmId = 0
      let dropLoc = []


      const pickLoc = {
        point: 'Pick',
        locationId: locId,
        notes: draftData.rawData.pickUp.pickNotes,
        name: draftData.rawData.pickUp.senderName,
        phoneName: draftData.rawData.pickUp.pickPhoneName,
        phoneNumber: draftData.rawData.pickUp.pickPhoneNumber.substring(2),
        addressName: draftData.rawData.pickUp.pickLabel,
        addressFormat: draftData.rawData.pickUp.pickAddress,
        addressLabel: draftData.rawData.pickUp.pickLabel,
        lnglat: draftData.rawData.pickUp.pickLocation,
        latlng: {
          lat: draftData.rawData.pickUp.pickLocation[1],
          lng: draftData.rawData.pickUp.pickLocation[0],
        },
        itemId: '',
        item: [],
        temp: draftData.rawData.pickUp.itemTmp
      }
      locId += 1
      transferLocation.push(pickLoc)
      setCenter(pickLoc.latlng)

      draftData.rawData.dropOff.map((loc) => {
        locId += 1
        itmId += 1
        const drop = {
          point: 'Drop',
          locationId: locId,
          notes: loc.dropNotes,
          name: loc.receiverName,
          phoneName: loc.dropPhoneName,
          phoneNumber: loc.dropPhoneNumber.substring(2),
          addressName: loc.dropLabel,
          addressFormat: loc.dropAddress,
          addressLabel: loc.dropLabel,
          lnglat: loc.dropLocation,
          latlng: {
            lat: loc.dropLocation[1],
            lng: loc.dropLocation[0],
          },
          itemId: itmId,
          item: {},
        }
        dropLoc.push(drop)
      })
      locId += 1
      dropLoc.map((drop) => {
        transferLocation.push(drop)
      })

      setLocation(transferLocation)
      setlocationId(locId + 1)
      setTargetLocationId(locId + 1)
      setItemId(itmId + 1)
      setTargetItemId(itmId + 1)
    }

    setLocViewType(2)
    setOrderAllow(true)
    setLoadingMapScreen(false)
  }

  const getAllData = async () => {
    // CustomerId
    setLoadingMapScreen(true)
    // console.log('context = ' + auth.id)
    setCustomerId(auth.id)
    // try {
    //   const response = await axios.get(`${url_auth}/profile`, {
    //     headers: {
    //       'Authorization': `Bearer ${access_token}`
    //     }
    //   })
    //   const data = response.data.data
    //   setCustomerId(data[0]?.id)
    //   console.log('fetch = ' + data[0]?.id)
    //   console.log('context = ' + auth.id)
    // } catch(error) {
    //   console.log(error.message)
    // }

    // Service
    try {
      const response = await axios.get(`${url}/api/general-service`, { headers })
      const data = response.data.data
      const filterData = data.filter(e => e.name.toLowerCase() !== 'dedicated delivery')
      setServices(filterData)
    } catch (error) {
      console.log(error.message)
    }

    // Vehicle
    try {
      const response = await axios.get(`${url}/api/vehicle-type`, { headers })
      const data = response.data.data
      setVehicles(data)
      setBikeId(data[0]?.id)
    } catch (error) {
      console.log(error.message)
    }

    // Middle Mile Vehicle
    try {
      const response = await axios.get(`${url}/api/vehicle-type-middle`, { headers })
      const data = response.data.data
      setmiddleMileVehicles(data)
    } catch (error) {
      console.log(error.message)
    }

    // Additional Service
    try {
      const response = await axios.get(`${url}/api/additional-service`, { headers })
      const data = response.data.data
      setAdditionalList(data)
      setSelectedAdditional(
        new Array(data.length).fill(false)
      )
    } catch (error) {
      console.log(error.message)
    }

    // Item Category List
    try {
      const response = await axios.get(`${url}/api/item-category`, { headers })
      const data = response.data.data
      setPackagesList(data)

      if (drftNum !== null) {
        try {
          const response = await axios.get(`${url}/api/tmp-order/${drftNum}`, { headers })

          transferAllDraftData(response.data.data, data)
        } catch (error) {
          console.log(error.message)
        }
      } else {
        setLoadingMapScreen(false)
      }

      if (locState?.state) {
        transferAllDraftData(locState?.state, data)
      }
    } catch (error) {
      console.log(error.message)
    }


  }

  const handleImportOrder = (data) => {
    setOpenImportOrder(false)
    setLoadingMapScreen(true)
    // setPromoCode(data?.promo)
    // transferAllDraftData(data.temp_order, packagesList)
    // return

    let transferLocation = []
    let locId = 0
    let itmId = 0



    data.pickUp.map(((loc) => {

      let dropLoc = []
      const pickLoc = {
        point: 'Pick',
        locationId: locId,
        notes: loc.notes === null ? "" : loc.notes,
        name: loc.senderName,
        phoneName: loc.pickPhoneName === null ? loc.senderName : loc.pickPhoneName,
        phoneNumber: loc.pickPhoneNumber.toString().substring(2),
        addressName: loc.pickLabel === "" ? loc.pickAddress : loc.pickLabel,
        addressFormat: loc.pickAddress,
        addressLabel: loc.pickLabel === "" ? loc.pickAddress : loc.pickLabel,
        lnglat: loc.pickLocation,
        latlng: {
          lat: loc.pickLocation[1],
          lng: loc.pickLocation[0],
        },
        itemId: '',
        item: []
      }
      loc.item.map((item, i) => {
        locId += 1
        itmId += 1
        const checkItem = packagesList.find((list) => {
          return list.name.toLowerCase() === item.itemCategory.toLowerCase()
        })
        const drop = {
          point: 'Drop',
          locationId: locId,
          notes: item.dropOff.dropNotes === null ? "" : item.dropOff.dropNotes,
          name: item.dropOff.receiverName,
          phoneName: item.dropOff.dropPhoneName === "" ? item.dropOff.receiverName : item.dropOff.dropPhoneName,
          phoneNumber: item.dropOff.dropPhoneNumber.toString().substring(2),
          addressName: item.dropOff.dropLabel === "" ? item.dropOff.dropAddress : item.dropOff.dropLabel,
          addressFormat: item.dropOff.dropAddress,
          addressLabel: item.dropOff.dropLabel === "" ? item.dropOff.dropAddress : item.dropOff.dropLabel,
          lnglat: item.dropOff.dropLocation,
          latlng: {
            lat: item.dropOff.dropLocation[1],
            lng: item.dropOff.dropLocation[0],
          },
          itemId: itmId,
          item: {
            itemId: itmId,
            packageCategory: checkItem === undefined ? "Lainnya" : item.itemCategory,
            itemDesc: checkItem === undefined ? item.itemCategory : "",
            weight: item.weight,
            lenght: item.lenght,
            width: item.width,
            height: item.height,
            temperature: item.itemTmp,
            quantity: item.itemQty,
          },
        }
        dropLoc.push(drop)
      })
      locId += 1
      transferLocation.push(pickLoc)
      dropLoc.map((drop) => {
        transferLocation.push(drop)
      })
      setCenter(pickLoc.latlng)
    }))
    setLocation(transferLocation)
    setlocationId(locId + 1)
    setTargetLocationId(locId + 1)
    setItemId(itmId + 1)
    setTargetItemId(itmId + 1)

    setLocViewType(2)
    setOrderAllow(true)
    setLoadingMapScreen(false)
  }

  const handleServices = (e, serviceId) => {
    setLocViewType(0)
    setOrderAllow(false)
    const currentdate = new Date
    setMinDate(currentdate)
    const timepickvalue = format(Date.parse(currentdate), 'HH:mm')
    const findtime = optionTime2HoursAgo.findIndex((opt, index) => {
      return opt >= timepickvalue
    })
    setDatePick(currentdate)
    setTimePick(optionTime[findtime])
    if (optionTime[findtime] === undefined) {
      setTimePick('pick-time')
    }
    setTempInput('')

    const selectedservice = e.target.value;
    setIsBike('Bike')
    setVehicleTypeId(bikeId)
    setSelectedVehicle('Bike')
    setAdditionalService([])
    setSelectedService(selectedservice);
    setServiceNameId(serviceId)


    setLocation([])
    setPickList([])
    setDropList([])
    setNotes('')
    setName('')
    setPhoneNumber('')
    setItemList([])

    if (e.target.value === 'superkul-truck' || serviceId === 'c768937b-6787-43d9-a3ad-bf9061459e18') {
      setMinDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      setDatePick(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      setIsBike('')
      setVehicleTypeId('')
      setSelectedVehicle('')
    }

    setToggleShow(false)
    setDetailOpen(false)
  };

  const handleIsBike = (e, vehicleid) => {
    const isbike = e.target.value;
    setIsBike(isbike);
    setSelectedVehicle(isbike)
    setVehicleTypeId(vehicleid)
  };

  const handleAdditional = (e, listid, position) => {
    const updateselected = selectedAdditional.map((item, index) => {
      return index === position ? !item : item
    })
    setSelectedAdditional(updateselected)
    let list = []
    const additionalAdd = additionalList.filter((e, indexList) => {
      updateselected.map((select, i) => {
        if (i === indexList) {
          if (select === true) {
            const check = {
              id: e.id,
            }
            list.push(check)
          }
        }
      })
    })
    setAdditionalService(list)
  }

  const handlePickTime = () => {
    if (datePick.getDate() === currentDate.getDate() && datePick.getMonth() === currentDate.getMonth() && datePick.getFullYear() === currentDate.getFullYear() && format(currentDate, "HH:mm") > "14:00") {
      errorPopup(t('error'), t('pickupTimeNotAvail'), t('close'))
    }
  }

  // Input Location Function
  const handleAddLocation = () => {
    // Automatic Hide Service
    if (location.length == 0) {
      setShowHideService(!showHideService)
    }

    if (serviceNameId === '') {
      errorPopup(t('error'), t('selectServiceFirst'), t('close'))
      return
    }
    if (vehicleTypeId === '') {
      errorPopup(t('error'), t('selectVehicleFirst'), t('close'))
      return
    }
    if (customerId === '') {
      errorPopup(t('error'), t('somethingError'), t('close'))

      return
    }
    if (locViewType !== 2 && location.length > 0) {
      errorPopup(t('error'), t('fillDataCorrectly'), t('close'))
      return
    }


    let addloc = {}
    if (location.length > 0) {
      if (point === 'Pick') {
        if (location[0].name === '' || location[0].phoneNumber === '') {
          errorPopup(t('error'), t('fillPickupDataCorrectly'), t('close'))
          return
        }
      }

      if (point === 'Drop') {
        if (selectedService === 'superkul-truck') {
          if (location[location.length - 1].name === '' || location[location.length - 1].phoneNumber === '') {
            errorPopup(t('error'), t('fillDropDataCorrectly'), t('close'))
            return
          }
        } else {
          if (
            location[location.length - 1].name === '' ||
            location[location.length - 1].phoneNumber === '' ||
            location[location.length - 1].item === []
          ) {
            errorPopup(t('error'), t('fillDropDataCorrectly'), t('close'))
            return
          }
        }
      }
      setPoint('Drop')
      addloc = {
        point: 'Drop',
        locationId: locationId,
        notes: '',
        name: '',
        phoneName: '',
        phoneNumber: '',
        addressName: '',
        addressFormat: '',
        addressLabel: '',
        lnglat: [],
        latlng: {},
        item: [],
        itemId: '',
      }
    } else {
      setPoint('Pick')
      addloc = {
        point: 'Pick',
        locationId: locationId,
        notes: '',
        name: '',
        phoneName: '',
        phoneNumber: '',
        addressName: '',
        addressFormat: '',
        addressLabel: '',
        lnglat: [],
        latlng: {},
        item: [],
        itemId: '',
      }
    }
    setTargetLocationId(locationId)
    setLocation(loc => [...loc, addloc])
    setlocationId(locationId + 1)
    setIsSaveBookmark(false)
    setItemList([])
    setPackageCategory('')
    setTemperature(0)
    setValue('notes', '')
    setValue('name', '')
    setValue('phoneNumber', '')
    setValue('bookmarkLabel', '')
    setValue('itemDesc', '')
    setPackageSize('')
    setIsCustomeSize(false)
    setValue('weight', '')
    setValue('lenght', '')
    setValue('width', '')
    setValue('height', '')
    setToggleShow(false)
    setDetailOpen(false)
  }

  const handleChooseSavedAddress = (data) => {
    setOpenSavedAddress(false)
    setLoadingMapScreen(true)
    const addressformat = data.address
    const addressname = data.label
    const lat = parseFloat(data.lan)
    const lng = parseFloat(data.lon)
    const changeAddress = location.map(loc => {
      if (loc.locationId === targetLocationId) {
        loc.point === 'Pick' ? setPoint('Pick') : setPoint('Drop')
        const newLoc = { ...loc, addressFormat: addressformat, addressName: addressname, addressLabel: addressname, lnglat: [lng, lat], latlng: { lat, lng } }
        return newLoc
      } else {
        return loc
      }
    })
    setFormattedAddress(addressformat)
    setLat(lat)
    setLng(lng)
    if (data.notes !== undefined && data.name !== undefined && data.phone !== undefined) {
      setValue('notes', data.notes === null ? '' : data.notes)
      setValue('name', data.name === null ? '' : data.name)
      setValue('phoneNumber', data.phone === null ? '' : data.phone.substring(2))
    }
    setCenter({ lat, lng })
    setPointLabel(addressname)
    setLocation(changeAddress)
    setLocViewType(1)
    setLoadingMapScreen(false)
    setToggleShow(true)
    setDetailOpen(true)
  }

  const handleRemoveLocation = (inputData) => {

    if (inputData.point === 'Pick') {
      const findDrop = location.find(loc => {
        return loc.point === 'Drop'
      })
      if (findDrop === undefined) {
        const removePick = location.filter(loc => loc.locationId !== inputData.locationId)
        setLocation(removePick)
      } else {
        Swal.fire({
          title: t('error'),
          text: t('removeDropFirst'),
          imageUrl: ConfirmIcon,
          showConfirmButton: true,
          confirmButtonColor: '#1F83BB',
          confirmButtonText: t('close'),
          customClass: {
            popup: 'popup-swal',
            title: 'title-swal',
            htmlContainer: 'text-swal',
            confirmButton: 'confirm-swal'
          }
        })
        return
      }
    } else {
      const removeDrop = location.filter(loc => loc.locationId !== inputData.locationId)

      setLocation(removeDrop)
    }
    if (location.length < 3) {
      setOrderAllow(false)
    }

  }

  const handleSearchLocation = (inputData) => {
    setTargetLocationId(inputData.locationId);
    setLocViewType(0);
    clearErrors()
    if (targetLocationId !== inputData.locationId) {
      setDetailOpen(false)
      setLoadingMapScreen(true)
      setTimeout(() => {
        setLoadingMapScreen(false)
        setPointLabel(inputData.addressLabel)
        setPoint(inputData.point)
        setValue('notes', inputData.notes)
        setValue('name', inputData.name)
        setValue('phoneNumber', inputData.phoneNumber)
        setValue('bookmarkLabel', '')
        if (inputData.point === 'Pick') {
          setTemperature(inputData.temp === undefined ? 0 : inputData.temp)
        }
        if (inputData.point === 'Drop') {
          setPackageCategory(inputData.item.packageCategory)
          const findSize = sizeData.find((size) => inputData.item.weight == size.weight && inputData.item.width == size.width && inputData.item.lenght == size.lenght && inputData.item.height == size.height)
          setPackageSize('')
          setIsCustomeSize(false)
          findSize ? setPackageSize(findSize.name) : setIsCustomeSize(true)
          setValue('itemDesc', inputData.item.itemDesc)
          setValue('weight', inputData.item.weight)
          setValue('lenght', inputData.item.lenght)
          setValue('width', inputData.item.width)
          setValue('height', inputData.item.height)
          setTemperature(inputData.item.temperature === undefined ? 0 : inputData.item.temperature)
        }
        setItemList(inputData.item)
        setTargetItemId(inputData.itemId)
        setToggleShow(true);
        setDetailOpen(true)
        setCenter(inputData.latlng)
      }, 1000);
    } else {
      setPoint(inputData.point)
      setValue('notes', inputData.notes)
      setValue('name', inputData.name)
      setValue('phoneNumber', inputData.phoneNumber)
      setValue('bookmarkLabel', '')
      if (inputData.point === 'Drop') {
        setPackageCategory(inputData.item.packageCategory)
        setValue('itemDesc', inputData.item.itemDesc)
        setValue('weight', inputData.item.weight)
        setValue('lenght', inputData.item.lenght)
        setValue('width', inputData.item.width)
        setValue('height', inputData.item.height)
        setTemperature(inputData.item.temperature === undefined ? 0 : inputData.item.temperature)
      }
      setCenter(inputData.latlng)
      setItemList(inputData.item)
      setTargetItemId(inputData.itemId)
      setToggleShow(true)
      setDetailOpen(true)
    }
    setTargetLocationId(inputData.locationId);
  }

  const handleClickLocation = (inputData) => {
    setTargetLocationId(inputData.locationId);
    setLocViewType(0);
    clearErrors()
    if (targetLocationId !== inputData.locationId) {
      setDetailOpen(false)
      setLoadingMapScreen(true)
      setTimeout(() => {
        setLoadingMapScreen(false)
        setPointLabel(inputData.addressLabel)
        setPoint(inputData.point)
        setValue('notes', inputData.notes)
        setValue('name', inputData.name)
        setValue('phoneNumber', inputData.phoneNumber)
        setValue('bookmarkLabel', '')
        if (inputData.point === 'Pick') {
          setTemperature(inputData.temp === undefined ? 0 : inputData.temp)
        }
        if (inputData.point === 'Drop') {
          setPackageCategory(inputData.item.packageCategory)
          setValue('itemDesc', inputData.item.itemDesc)
          setValue('weight', inputData.item.weight)
          setValue('lenght', inputData.item.lenght)
          setValue('width', inputData.item.width)
          setValue('height', inputData.item.height)
          setTemperature(inputData.item.temperature === undefined ? 0 : inputData.item.temperature)
        }
        setItemList(inputData.item)
        setTargetItemId(inputData.itemId)
        // setToggleShow(true); 
        // setDetailOpen(true)
        setCenter(inputData.latlng)
      }, 1000);
    } else {
      setPoint(inputData.point)
      setValue('notes', inputData.notes)
      setValue('name', inputData.name)
      setValue('phoneNumber', inputData.phoneNumber)
      setValue('bookmarkLabel', '')
      if (inputData.point === 'Drop') {
        setPackageCategory(inputData.item.packageCategory)
        setValue('itemDesc', inputData.item.itemDesc)
        setValue('weight', inputData.item.weight)
        setValue('lenght', inputData.item.lenght)
        setValue('width', inputData.item.width)
        setValue('height', inputData.item.height)
        setTemperature(inputData.item.temperature === undefined ? 0 : inputData.item.temperature)
      }
      setCenter(inputData.latlng)
      setItemList(inputData.item)
      setTargetItemId(inputData.itemId)
      // setToggleShow(true)
      // setDetailOpen(true)
    }
    setTargetLocationId(inputData.locationId);
  }


  const handleChangeAddressName = (e, id) => {
    const changeAddress = location.map(loc => {
      if (loc.locationId === id) {
        const newLoc = { ...loc, addressName: e, addressLabel: e }
        return newLoc
      } else {
        return loc
      }
    })
    setLocation(changeAddress)
  }

  const handleBookmark = (e) => {
    if (e.target.checked) {
      setIsSaveBookmark(true)
    } else {
      setIsSaveBookmark(false)
    }
  }

  const saveToBookmark = async (label, locBookmark) => {
    const addData = {
      user_id: customerId,
      address: formattedAddress,
      label: label,
      name: getValues().name,
      phone: `62${getValues().phoneNumber}`,
      notes: getValues().notes,
      lan: lat,
      lon: lng
    }
    try {
      const response = await axios.post(`${url}/api/bookmark`, addData, { headers })
      Swal.fire({
        title: t('addressSavedSuccess'),
        timer: 2000,
        imageUrl: SuccessIcon,
        showConfirmButton: false,
        customClass: {
          popup: 'popup-swal',
          title: 'title-swal'
        }
      })
      const changeAddress = locBookmark.map(loc => {
        if (loc.locationId === targetLocationId) {
          const newLoc = { ...loc, addressLabel: label }
          return newLoc
        } else {
          return loc
        }
      })
      setLocation(changeAddress)
    } catch (error) {
      console.log(error.message)
    }
    setBookmarkReload(!bookmarkReload)
    setIsSaveBookmark(false)
    setTargetLocationId('')
  }


  // Location Function
  const savePoint = (form) => {



    setLoadingMapScreen(true)
    // * IF SAVE BOOKMARK CHECKED
    if (isSaveBookmark) {
      if (bookmarkLabel === '') {
        Swal.fire({
          title: t('fillLabelBookmark'),
          timer: 2000,
          icon: 'error',
          showConfirmButton: false,
          customClass: {
            popup: 'popup-swal',
            title: 'title-swal'
          }
        })
        return
      }
    }


    let locationForBookmark
    const newData = {
      point: point,
      notes: form.notes,
      name: form.name,
      phoneName: form.name,
      phoneNumber: form.phoneNumber,
      packageCategory: packageCategory,
      weight: form.weight,
      lenght: form.lenght,
      width: form.width,
      height: form.height,
      itemTmp: temperature
    }

    if (point === 'Pick') {
      const updateData = location.map(loc => {
        if (loc.locationId === targetLocationId) {
          const newData = {
            ...loc,
            point: point,
            notes: form.notes,
            name: form.name,
            phoneName: form.name,
            phoneNumber: form.phoneNumber,
            temp: temperature
          }
          return newData
        } else {
          return loc
        }
      })
      locationForBookmark = updateData
      setLocation(updateData)
    } else {
      let selectedDrop
      if (selectedService !== 'superkul-truck') {
        if (packageCategory === '' || packageCategory === undefined) {
          setLoadingMapScreen(false)
          errorPopup(t('error'), t('selectPackagesCategoryFirst'), t('close'))
          return
        }
        if (!isCustomeSize) {
          if (packageSize === '') {
            setLoadingMapScreen(false)
            errorPopup(t('error'), t('selectPackagesSize'), t('close'))
            return
          }
        }
      }

      const newItem = {
        itemId: targetItemId,
        packageCategory: packageCategory,
        itemDesc: form.itemDesc,
        weight: form.weight,
        lenght: form.lenght,
        width: form.width,
        height: form.height,
        temperature: temperature,
        quantity: quantity,
      }

      const updateData = location.map(loc => {
        if (loc.locationId === targetLocationId) {
          const newData = {
            ...loc,
            point: point,
            notes: form.notes,
            name: form.name,
            phoneName: form.name,
            phoneNumber: form.phoneNumber,
            item: newItem,
            itemId: targetItemId
          }
          selectedDrop = newData
          return newData
        } else {
          return loc
        }
      })

      setLocation(updateData)
      locationForBookmark = updateData
      setOrderAllow(true)
    }

    if (isSaveBookmark) {
      saveToBookmark(bookmarkLabel, locationForBookmark)
    }

    setTimeout(() => {
      setLoadingMapScreen(false)
      setLocViewType(2)
      setToggleShow(false)
      setDetailOpen(false)
      if (!isSaveBookmark) {
        setTargetLocationId('')
      }
      isbookmarkref.current.checked = false
    }, 1000);
  }

  const cancelPoint = (e) => {
    setTargetLocationId('')
    setLocViewType(2)
    setToggleShow(false);
    setDetailOpen(false)
  }

  const sizeData = [
    {
      name: 'S',
      weight: 10,
      height: 27,
      width: 24,
      lenght: 36,
      volume: 23
    },
    {
      name: 'M',
      weight: 15,
      height: 30,
      width: 26,
      lenght: 45,
      volume: 35
    },
    {
      name: 'L',
      weight: 30,
      height: 42,
      width: 32,
      lenght: 58,
      volume: 70
    },
  ]

  // Maps Config
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  })

  if (!isLoaded) {
    return (
      <h1></h1>
    )
  }

  // Geocode
  const placeChanged = (e, targetId) => {
    /* eslint-disable */
    setLoadingMapScreen(true)
    setLocationError(false)
    const geocoder = new google.maps.Geocoder()
    const recentLocal = JSON.parse(localStorage.getItem('recentAddr'))

    geocoder.geocode({ 'address': e }).then((response) => {
      const addressformat = response.results[0].formatted_address
      const addressname = e
      const lat = response.results[0].geometry.location.lat()
      const lng = response.results[0].geometry.location.lng()
      const changeAddress = location.map(loc => {
        if (loc.locationId === targetId) {
          loc.point === 'Pick' ? setPoint('Pick') : setPoint('Drop')
          const newLoc = { ...loc, addressFormat: addressformat, addressName: addressname, addressLabel: addressname, lnglat: [lng, lat], latlng: { lat, lng } }
          return newLoc
        } else {
          return loc
        }
      })
      const recent = {
        address: addressformat,
        label: addressname,
        lan: lat,
        lon: lng
      }

      if (recentLocal === null) {
        localStorage.setItem('recentAddr', JSON.stringify([recent]))
      } else {
        localStorage.setItem('recentAddr', JSON.stringify([...recentLocal, recent]))
      }
      setRecentLocation([...recentLocation, recent])
      setFormattedAddress(addressformat)
      setLat(lat)
      setLng(lng)
      setCenter({ lat, lng })
      setPointLabel(addressname)
      setLocation(changeAddress)
      setLocViewType(1)
      setLoadingMapScreen(false)
      setToggleShow(true)
      setDetailOpen(true)
    }).catch((error) => {
      console.log(error.message)
      setLoadingMapScreen(false)
      errorPopup(t('error'), t('locationNotFound'), t('close'))
    })
  }

  // Reverse Geocode
  const dragEnd = (e, targetId) => {
    /* eslint-disable */
    setLoadingMapScreen(true)
    setTargetLocationId(targetId)
    const geocoder = new google.maps.Geocoder()
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    const latlng = {
      lat,
      lng
    }

    setLat(lat)
    setLng(lng)
    geocoder.geocode({ location: latlng })
      .then((response) => {
        const addressformat = response.results[0].formatted_address
        const addressname = response.results[0].name
        setFormattedAddress(addressformat)
        const changeAddress = location.map(loc => {
          if (loc.locationId === targetId) {
            const newLoc = { ...loc, addressFormat: addressformat, addressName: addressformat, addressLabel: addressformat, lnglat: [lng, lat], latlng: { lat, lng } }
            return newLoc
          } else {
            return loc
          }
        })


        setFormattedAddress(addressformat)
        setLat(lat)
        setLng(lng)
        setLocation(changeAddress)
        setLocViewType(0)
        setLoadingMapScreen(false)
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }


  // ! FINAL TOUCH
  const handleCreateOrder = async () => {
    // setLoadingMapScreen(true)
    if (serviceNameId === '') {
      errorPopup(t('error'), t('selectServiceFirst'), t('close'))
      return
    }

    let time = timePick

    const currenttime = new Date
    if (selectedService === 'instant-delivery') {
      time = format(Date.parse(currenttime), 'HH:mm')
    } else {
      if (datePick === '' || timePick === 'pick-time' || timePick === undefined || timePick === null || timePick === '') {
        errorPopup(t('error'), t('selectDateTimeFirst'), t('close'))
        return
      }
    }

    if (format(datePick, 'yyyy-MM-dd') < format(currenttime, 'yyyy-MM-dd')) {
      errorPopup(t('error'), t('pickupdateNotAvail'), t('close'))
      return
    }

    const optIndex = optionTime.findIndex(optTime => time === optTime)
    const opt2hours = optionTime2HoursAgo.find((optTime, i) => i === optIndex)

    // ! Disini problem import sameday
    if (
      time < format(Date.parse(currenttime) + 120 * 60 * 1000, 'HH:mm') &&
      datePick.getDate() === currenttime.getDate() &&
      datePick.getMonth() === currenttime.getMonth() &&
      datePick.getFullYear() === currenttime.getFullYear() &&
      selectedService === 'superkul-truck') {
      errorPopup(t('error'), t('pickuptimeNotAvail'), t('close'))
      return
    }

    if (
      datePick.getDate() === currenttime.getDate() &&
      datePick.getMonth() === currenttime.getMonth() &&
      datePick.getFullYear() === currenttime.getFullYear() && selectedService === 'superkul-truck') {
      errorPopup(t('error'), t('superkultruckOnlyTommorow'), t('close'))
      return
    }

    if (time > '16:00') {
      errorPopup(t('error'), t('pickupBefore16'), t('close'))
      return
    }

    // Get only pickLocation
    const pickLocation = location.filter(loc => {
      return loc.point === 'Pick' && loc.addressFormat !== ''
    })

    // Get only dropLocation for middle mile/ super truck
    const dropLocation = location.filter(loc => {
      return loc.point === 'Drop' && loc.addressFormat !== ''
    })

    // Check duplicate address
    let duplicateIds = location
      .map(e => e['addressFormat'])
      .map((e, i, final) => final.indexOf(e) !== i && i)
      .filter(obj => location[obj])
      .map(e => location[e]["addressFormat"])

    let duplicateLoc = location.filter((obj) => duplicateIds.includes(obj.addressFormat));

    if (duplicateLoc.length !== 0) {
      let duplicateIndex = []
      duplicateLoc.map((loc) => {
        location.map((object, i) => {
          object.locationId === loc.locationId && duplicateIndex.push(`${i == 0 ? 'Pick' : 'Drop'} ${i}`)
        });
      })
      errorPopup(t('error'), duplicateIndex.join(", ") + t('sameAddress'), t('close'))
      return
    }


    if (vehicleTypeId === '') {
      errorPopup(t('error'), t('selectServiceFirst'), t('close'))
      return
    }
    if (customerId === '') {
      errorPopup(t('error'), t('somethingWrong'), t('close'))
      return
    }
    if (pickLocation.length === 0) {
      errorPopup(t('error'), t('addPickupFirst'), t('close'))
      return
    }
    if (dropLocation.length === 0) {
      errorPopup(t('error'), t('addDropFirst'), t('close'))
      return
    }


    let orderData
    if (selectedService === 'superkul-truck') {
      orderData = {
        serviceNameId: serviceNameId,
        customerId: customerId,
        datePick: format(datePick, 'yyyy-MM-dd'),
        timePick: time,
        vehicleTypeId: vehicleTypeId,
        pickUp: {
          pickNotes: pickLocation[0].notes === "" ? "-" : pickLocation[0].notes,
          senderName: pickLocation[0].name,
          pickPhoneName: pickLocation[0].name,
          pickPhoneNumber: `62${pickLocation[0].phoneNumber}`,
          pickAddress: pickLocation[0].addressFormat,
          pickLabel: pickLocation[0].addressLabel,
          pickLocation: pickLocation[0].lnglat,
          itemTmp: parseInt(pickLocation[0].temp)
        },
        dropOff:
          dropLocation.map((dropLoc) => {
            return (
              {
                dropNotes: dropLoc.notes === "" ? "-" : dropLoc.notes,
                receiverName: dropLoc.name,
                dropPhoneName: dropLoc.name,
                dropPhoneNumber: `62${dropLoc.phoneNumber}`,
                dropAddress: dropLoc.addressFormat,
                dropLabel: dropLoc.addressLabel,
                dropLocation: dropLoc.lnglat
              }
            )
          })
      }
    } else {
      orderData = {
        serviceNameId: serviceNameId,
        customerId: customerId,
        datePick: format(datePick, 'yyyy-MM-dd'),
        timePick: time,
        vehicleTypeId: vehicleTypeId,
        additionalService: additionalService,
        extraService: extraService,
        pickUp:
          pickLocation.map(pickLoc => {
            return (
              {
                notes: pickLoc.notes === "" ? "-" : pickLoc.notes,
                senderName: pickLoc.name,
                pickPhoneName: pickLoc.name,
                pickPhoneNumber: `62${pickLoc.phoneNumber}`,
                pickAddress: pickLoc.addressFormat,
                pickLabel: pickLoc.addressLabel,
                pickLocation: pickLoc.lnglat,
                item:
                  dropLocation.map(dropLoc => {
                    return (
                      {
                        itemCategory: dropLoc.item.packageCategory === "Lainnya" ? dropLoc.item.itemDesc : dropLoc.item.packageCategory,
                        weight: parseInt(dropLoc.item.weight),
                        height: parseInt(dropLoc.item.height),
                        width: parseInt(dropLoc.item.width),
                        lenght: parseInt(dropLoc.item.lenght),
                        itemTmp: dropLoc.item.temperature,
                        itemQty: parseInt(dropLoc.item.quantity),
                        dropOff: {
                          dropNotes: dropLoc.notes === "" ? "-" : dropLoc.notes,
                          receiverName: dropLoc.name,
                          dropPhoneName: dropLoc.name,
                          dropPhoneNumber: `62${dropLoc.phoneNumber}`,
                          dropAddress: dropLoc.addressFormat,
                          dropLabel: dropLoc.addressLabel,
                          dropLocation: dropLoc.lnglat
                        }
                      }
                    )
                  })
              }
            )
          })
      }
    }
    setOrderId(orderData)

    setLoadingMapScreen(true)

    const lang = localStorage.getItem('lang')

    try {
      const response = await axios.post(`${url}/api/tmp-order`, orderData, { headers })
      setLoadingMapScreen(false)
      if (response.data.status === 'failed') {
        ReactGA.event({
          category: "order_category",
          action: "temp_order_failed",
          // label: "start_delivery_label", 
          // value: 99
        });
        response.data.data ?
          errorPopup(t('checkAddress'), `<strong>${response.data.data}</strong> ${response.data.message}`, t('gotit'), LocationTooFarIcon)
          :
          errorPopup(t('checkAddress'), lang === "en" ? response?.data?.message_en : response?.data?.message, t('gotit'), LocationTooFarIcon)
        return
      }

      if (response.data.data !== undefined) {
        const id = response.data.data
        setOrderId(id)
        ReactGA.event({
          category: "order_category",
          action: "temp_order_success",
          // label: "start_delivery_label", 
          // value: 99
        });
        if (promoCode === '' || promoCode === null) {
          navigate(`trip-planning/${id._id}`)
        } else {
          navigate(`trip-planning/${id._id}?prm=${promoCode}`)
        }
      }
      if (response.data.data === undefined) {
        errorPopup(t('error'), response.data.message, t('close'))
      }
    } catch (error) {
      console.log(error.message)
      setLoadingMapScreen(false)
      ReactGA.event({
        category: "order_category",
        action: "temp_order_error",
        // label: "start_delivery_label", 
        // value: 99
      });
      if (error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'), t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'), t('somethingError'), t('close'))
      }
    }
  }

  const backButton = () => {
    if (drftNum === null) {
      navigate('/')
    } else {
      navigate(`/draft-detail/${drftNum}`)
    }
  }

  // * COMPONENT
  const HeaderOrder = () => {
    return (
      <div className="header-order">
        <div className="title">
          <img src={HomeIcon} alt='' className="home-btn" onClick={backButton} />
          <p className="title-text">{t('createOrder')}</p>
        </div>
        <div className="header-progress">
          <div className='create active'>
            <h6 className="progress-index">1</h6>
            <h6 className="progress-name">{t('createOrder')}</h6>
          </div>
          <div className='trip-planning'>
            <h6 className="progress-index">2</h6>
            <h6 className="progress-name">{t('tripPlanning')}</h6>
          </div>
          <div className='order-confirm'>
            <h6 className="progress-index">3</h6>
            <h6 className="progress-name">{t('orderConfirm')}</h6>
          </div>
          <div className='order-confirm'>
            <h6 className="progress-index">4</h6>
            <h6 className="progress-name">{t('payment')}</h6>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="start-delivery">
      {loadingMapScreen && <div className="loading-map-screen"></div>}

      <InputSavedAddress isOpen={openSavedAddress} toggle={toggleSavedAddress} data={handleChooseSavedAddress} id={customerId} trigger={bookmarkReload} />

      <ImportOrder isOpen={openImportOrder} toggle={toggleImportOrder} extractData={handleImportOrder} id={customerId} />

      <Helmet>
        <title>Superkul</title>
      </Helmet>
      <div className="order-side">
        <HeaderOrder />
        <div className="create-order">
          <div className={`service ${showHideService ? 'hide' : ''}`}>
            <div className="select-service">
              <div className="header-select-service">
                <p className="text-title" >{t('selectService')}</p>
              </div>
              <div className="form-service">
                {services.map((service, i) => {
                  const label = service.name
                  const name = service.name.toLowerCase().split(' ').join('-')
                  return (
                    <div className={`${name}-option`}>
                      <input
                        type="radio"
                        id={name}
                        name={name}
                        value={name}
                        onClick={(e) => handleServices(e, service.id)}
                      />
                      <label className={`label-radio ${selectedService === name ? 'active' : ''}`} htmlFor={name}>
                        {name === 'sameday-delivery' &&
                          <img src={selectedService === name ? SamedayIconActive : SamedayIcon} alt="sameday" className={`icon-${name}`} />
                        }
                        {name === 'instant-delivery' &&
                          <img src={selectedService === name ? InstantIconActive : InstantIcon} alt="sameday" className={`icon-${name}`} />
                        }
                        {name === 'superkul-truck' &&
                          <img src={selectedService === name ? CDDIconActive : CDDIcon} alt="sameday" className={`icon-${name}`} />
                        }
                        {label}
                      </label>
                    </div>
                  )
                })}
                {selectedService !== "instant-delivery" && (
                  <div className="d-flex flex-wrap gap-md-0 gap-1 justify-content-around w-100">
                    <div className="input-wrapper">
                      <label className="label-input" htmlFor="start">
                        {t('datePickup')}
                      </label>
                      <DatePicker
                        selected={datePick}
                        dateFormat="dd MMM yyyy"
                        className='input-text'
                        placeholderText="Pick Date"
                        minDate={minDate}
                        onChange={(date) => {
                          setDatePick(date === null ? new Date() : date);
                          setTimePick('pick-time')
                        }
                        }
                        excludeDateIntervals={[{ start: subDays(new Date('2023-04-19'), 1), end: addDays(new Date('2023-04-26'), 0) }]}
                      />
                      <img src={CalendarIcon} alt="" />
                    </div>
                    <div className="input-wrapper">
                      <label for="package-category" className="label-input">{t('timePickup')}</label>
                      <select name="times" className="input-text" value={timePick} onChange={(e) => setTimePick(e.target.value)} onClick={handlePickTime}>
                        <option value="pick-time" disabled hidden>Pick Time</option>

                        {'jika opt - 2jam lebih kecil dari currenttime'}
                        {currentDate.getDate() === datePick.getDate() && currentDate.getMonth() === datePick.getMonth() && currentDate.getFullYear() === datePick.getFullYear() ?
                          optionTime.map((opt, index) => {
                            if (currenttime >= optionTime2HoursAgo[index]) {
                              return null
                            } else {
                              return <option value={opt} >{opt}</option>
                            }
                            // return <option value={opt} disabled={currenttime >= optionTime2HoursAgo[index] ? 'disabled' : ''}>{opt}</option>
                          })
                          :
                          optionTime.map((opt, index) => {
                            return <option value={opt}>{opt}</option>
                          })
                        }
                      </select>
                      <img src={TimeIcon} alt="" />
                      <br />
                    </div>

                  </div>
                )}
              </div>
            </div>
            <div className="select-vehicles">
              <div className="header-vehicles">
                <p className="text-title">{t('selectVehicles')}</p>
              </div>
              <div className="body-vehicles">
                <div className="vehicles-checkbox">
                  {selectedService === "superkul-truck" ?
                    middleMileVehicles.map((vehicle) => {
                      return (
                        <label className="custom-vehicles" key={vehicle.id}>
                          <input
                            type="radio"
                            name="check"
                            className="check-vehicles"
                            value={vehicle.name}
                            onClick={(e) => handleIsBike(e, vehicle.id)}
                            checked={selectedVehicle === vehicle.name ? 'checked' : ''}
                          />
                          <div className="content">
                            {vehicle.name.toLowerCase() === 'van' ?
                              <img src={selectedVehicle === vehicle.name ? CDEIconActive : CDEIcon} alt="" className="icon-vehicles" />
                              :
                              <img src={selectedVehicle === vehicle.name ? CDDIconActive : CDDIcon} alt="" className="icon-vehicles" />
                            }
                            <img src={CheckIcon} alt="" className="check-icon" />
                          </div>
                          <h5 className="vehicle-name">{vehicle.name}</h5>
                        </label>
                      )
                    })
                    :
                    vehicles.map((vehicle) => {
                      return (
                        <label className="custom-vehicles" key={vehicle.id}>
                          <input
                            type="radio"
                            name="check"
                            className="check-vehicles"
                            value={vehicle.name}
                            onClick={(e) => handleIsBike(e, vehicle.id)}
                            checked={selectedVehicle === vehicle.name ? 'checked' : ''}
                          />
                          <div className="content">
                            <img src={selectedVehicle === vehicle.name ? BikeIconActive : BikeIcon} alt="" className="icon-vehicles" />
                            <img src={CheckIcon} alt="" className="check-icon" />
                          </div>
                          <h5 className="vehicle-name">{vehicle.name}</h5>
                        </label>
                      )
                    })
                  }

                </div>
                {isBike === "Bike" && (
                  <div className="additional-service">
                    {additional && (
                      <div>
                        {/* <div className="max-capacity">Maximum capacity 30kg</div> */}
                        <p className="additional-title">
                          {t('selectAdditionalService')}
                        </p>
                        {additionalList.map((list, index) => (
                          <div className="mt-2" key={list.id}>
                            <input
                              type="checkbox"
                              id={list.id}
                              name={list.id}
                              className='additional-input'
                              checked={selectedAdditional[index]}
                              onChange={(e) => handleAdditional(e, list.id, index)}
                            />
                            <label
                              className="label-additional-list"
                              htmlFor={list.id}
                            >
                              <div className="additional-list">
                                <p>{list.name}</p>
                                <p>Rp. {numberFormat(list.price || list.amount)}</p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* <p
                      className="hiden-addservice"
                      onClick={() => setAdditional(!additional)}
                    >
                      {additional
                        ? "hide additional service"
                        : "show additional service"}
                    </p> */}
                  </div>
                )}

              </div>
            </div>
          </div>
          <p className="show-hide-service" onClick={() => setShowHideService(!showHideService)}>
            <img src={ArrowHideIcon} alt="" className={showHideService ? 'hide-icon' : 'show-icon'} />
            {showHideService ? t('showService') : t('hideService')}
          </p>
          <div className="input-location">
            <div className="header-input-location">
              <p className="text-title">{t('listDeliveryLocation')}</p>
              {selectedService === 'sameday-delivery' ?
                <button className="import-btn" onClick={toggleImportOrder}>
                  <img src={ImportIcon} className="import-btn-icon" /> {t('import')}
                </button>
                : null
              }
            </div>

            <div className="input-field">
              {location.map((input, indexLoc) => {
                return (
                  <>
                    <div className={`input-area ${locViewType === 0 && '',
                      locViewType === 1 && 'dataAddr',
                      locViewType === 2 && 'dataFull'
                      }`}>
                      {targetLocationId !== input.locationId || locViewType === 1 ?
                        <Badge className={`set-as-${input.point.toLowerCase()}`}>{input.point} {indexLoc}</Badge>
                        : null
                      }
                      <PlacesAutocomplete

                        value={input.addressLabel}
                        onChange={(e) => handleChangeAddressName(e, input.locationId)}
                        onSelect={(e) => placeChanged(e, input.locationId)}
                        searchOptions={
                          {
                            componentRestrictions: { country: ['id'] },
                            // location: new google.maps.LatLng(-6.593930, 106.796410),
                            // radius: 500,
                            // types: ['address']
                          }
                        }

                      >

                        {({ getInputProps, getSuggestionItemProps, suggestions }) => (
                          <div
                            className={`input-address`}
                            style={
                              {
                                height: targetLocationId === input.locationId ? locViewType === 1 ?
                                  input.name === '' ? '3rem' : '4rem'
                                  :
                                  '2.5rem'
                                  : '4rem'
                              }
                            }
                          >
                            <input
                              onClick={() => { handleClickLocation(input) }}
                              {...getInputProps({
                                placeholder: indexLoc === 0 ? t('addPickupPlaceholder') : t('addDropPlaceholder'),
                                className: 'location-search-input',
                              })}
                            />
                            {input.addressLabel.length > 2 &&
                              <div className="autocomplete-dropdown-container">

                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '1rem' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                      className='suggest'
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            }
                          </div>
                        )}
                      </PlacesAutocomplete>

                      {targetLocationId !== input.locationId || locViewType === 1 ?
                        <div className={`input-data-full full-data ${input.addressLabel === '' ? 'hidden' : ''}`} onClick={() => { handleSearchLocation(input) }}>
                          <p className="address-label">{input.addressLabel}</p>
                          <p className="address-format">{input.addressFormat}</p>
                          {input.name !== '' ?
                            <p className="full-data">{input.name} | 62{input.phoneNumber} | {input.notes}</p>
                            : null
                          }
                        </div>
                        : null
                      }

                      {targetLocationId === input.locationId && input.addressLabel.length <= 2 && input.addressLabel.length > 0 && locViewType == 0 ?
                        <div className="recent-loc">
                          <h6>{t('suggestAddress')}</h6>
                          {JSON.parse(localStorage.getItem('recentAddr')) === null ?
                            recentLocation.map(rcnt => {
                              return (
                                <div className="recent-loc-data" onClick={() => handleChooseSavedAddress(rcnt)}>
                                  <p className="address-label">{rcnt.label}</p>
                                  <p className="address-format">{rcnt.address}</p>
                                </div>
                              )
                            })
                            :
                            JSON.parse(localStorage.getItem('recentAddr')).map(rcnt => {
                              return (
                                <div className="recent-loc-data" onClick={() => handleChooseSavedAddress(rcnt)}>
                                  <p className="address-label">{rcnt.label}</p>
                                  <p className="address-format">{rcnt.address}</p>
                                </div>
                              )
                            })
                          }
                        </div>
                        :
                        null
                      }
                      <div className="icon">
                        {targetLocationId === input.locationId ?
                          <img src={SearchIcon} className="search-icon" />
                          : null
                        }

                        {targetLocationId === input.locationId ?
                          <img src={SavedAddressIcon} alt="" className="saved-address-icon" onClick={() => toggleSavedAddress(input.locationId)} />
                          :
                          <img src={RemoveIcon} className="delete-icon" onClick={() => handleRemoveLocation(input)} />
                        }
                      </div>
                    </div>
                  </>
                )
              })}
            </div>

            {selectedService !== 'instant-delivery' ?
              <button className="btn add-loc" onClick={handleAddLocation}>
                <img src={AddIcon} className="add-loc-icon" />
                {location.length > 0 ? t('addDrop') : t('addPickup')}
              </button>
              :
              location.length < 2 ?
                <button className="btn add-loc" onClick={handleAddLocation}>
                  <img src={AddIcon} className="add-loc-icon" />
                  {location.length > 0 ? t('addDrop') : t('addPickup')}
                </button>
                : null
            }
          </div>
          {toggleShow &&
            <img src={ToggleIcon} alt="" className={`toggle-icon ${detailOpen ? '' : 'close'}`} onClick={() => setDetailOpen(!detailOpen)} />
          }
          <form className={`detail-create-order-deliv ${detailOpen ? 'show-detail' : ''}`} onSubmit={handleSubmit(savePoint)}>
            {/* <div className="detail-container"> */}
            <div className="detail-header">
              <h1>{point === 'Pick' ? t('Pickup') : t('Drop')}</h1>
            </div>
            <div className="detail-content">
              <div className="detail-form">
                <div className="detail-data">
                  {point === 'Pick' ?
                    <>
                      <label htmlFor="sender-name">{t('senderName')}</label>
                      <input
                        type="text"
                        id="sender-name"
                        name="sender-name"
                        className={errors.name ? 'error' : ''}
                        placeholder={t('senderNamePlaceholder')}
                        // value={name} 
                        onInput={(e) => setName(e.target.value)}
                        {...register("name", {
                          required: true
                        })}
                      /><br />
                      {errors?.name?.type === "required" && <p>{t('fieldRequired')}</p>}
                    </>
                    :
                    <>
                      <label htmlFor="receiver-name">{t('receiverName')}</label>
                      <input
                        type="text"
                        id="receiver-name"
                        name="receiver-name"
                        className={errors.name ? 'error' : ''}
                        placeholder={t('receiverNamePlaceholder')}
                        // value={name} 
                        onInput={(e) => setName(e.target.value)}
                        {...register("name", {
                          required: true
                        })}
                      />
                      <br />
                      {errors?.name?.type === "required" && <p>{t('fieldRequired')}</p>}
                    </>
                  }

                  <div>
                    <label htmlFor="phone-number">{t('phoneNumber')}</label>
                    <h6 className="phone-62">62</h6>
                    <input
                      type="text"
                      id="phone-number"
                      name="phone-number"
                      className={errors.phoneNumber ? 'error' : ''}
                      placeholder={point === 'Pick' ? t('phoneNumberPlaceholder') : t('phoneNumberReceiverPlaceholder')}
                      // value={phoneNumber} 
                      onInput={(e) => setPhoneNumber(e.target.value)}
                      {...register("phoneNumber", {
                        required: true,
                        maxLength: 13,
                        minLength: 8,
                        pattern: /^\d+$/,
                        validate: value => !value[0].match(0)
                      })}
                    />
                    <br />
                    {errors?.phoneNumber?.type === "required" && <p>{t('fieldRequired')}</p>}
                    {errors?.phoneNumber?.type === "pattern" &&
                      <p>{t('numbersOnly')}</p>
                    }
                    {errors?.phoneNumber?.type === "minLength" && (
                      <p>{t('minPhoneNum')}</p>
                    )}
                    {errors?.phoneNumber?.type === "maxLength" && (
                      <p>{t('maxPhoneNum')}</p>
                    )}
                    {errors?.phoneNumber?.type === "validate" && (
                      <p>{t('firstNumber0')}</p>
                    )}
                  </div>


                  <label htmlFor="notes">{t('notes')} {'(Optional)'}</label>
                  <input
                    type="text"
                    id="notes"
                    name="notes"
                    placeholder={t('notesPlaceholder')}
                    // value={notes} 
                    onInput={(e) => setNotes(e.target.value)}
                    {...register("notes")}
                  />
                  <br />

                  <input type="checkbox" name="bookmark-address" id="bookmark-address" onChange={handleBookmark} ref={isbookmarkref} />
                  <label htmlFor="bookmark-address" className="bookmark-address">{t('saveAddress')}</label> <br />

                  {isSaveBookmark &&
                    <>
                      <label htmlFor="bookmark-label" className="bookmark-label">{t('label')}</label>
                      <input
                        type="text"
                        id="bookmark-label"
                        name="bookmark-label"
                        className={errors.bookmarkLabel ? 'error' : ''}
                        placeholder={t('labelPlaceholder')}
                        // value={bookmarkLabel} 
                        onInput={(e) => setBookmarkLabel(e.target.value)}
                        {...register("bookmarkLabel", {
                          required: true
                        })}
                      />
                      <br />
                      {errors?.bookmarkLabel?.type === "required" && <p>{t('fieldRequired')}</p>}
                    </>
                  }

                  {point === 'Pick' && selectedService === 'superkul-truck' &&
                    <>
                      <label htmlFor="temperature" id="temperature-label">{t('temperature')}</label>
                      <div className="range">
                        <Slider
                          min={-25}
                          max={25}
                          marks={{
                            '-25': '-25°C',
                            '-20': '-20°C',
                            '-15': '-15°C',
                            '-10': '-10°C',
                            '-5': '-5°C',
                            0: '0°C',
                            5: '5°C',
                            10: '10°C',
                            15: '15°C',
                            20: '20°C',
                            25: '25°C'
                          }}
                          defaultValue={temperature}
                          value={temperature}
                          trackStyle={{
                            backgroundColor: '#6EB9E3',
                            height: '0.5rem'
                          }}
                          railStyle={{
                            backgroundColor: '#E1EAF6',
                            height: '0.5rem',
                          }}
                          handleStyle={{
                            borderColor: '#1F83BB',
                            height: '1.1rem',
                            width: '1.1rem',
                            // height: 28,
                            // width: 28,
                            opacity: 1,
                            backgroundColor: '#1F83BB',
                          }}
                          onChange={(e) => setTemperature(e)}
                        />
                        <h6>{temperature}&deg; C</h6>
                      </div>
                    </>
                  }

                </div>
                {point === 'Drop' && selectedService !== 'superkul-truck' ?
                  <div className="pickup-packages">
                    <div className="packages-title">
                      <h1>{t('pickupPackages')}</h1>
                    </div>
                    <div className="add-packages-body">
                      <label for="package-category">{t('packagesCategory')}</label>
                      <ButtonGroup className="package-category">
                        {packagesList.map((pack, index) => {
                          return (
                            <Button
                              color="primary"
                              outline
                              className="package-choices"
                              onClick={() => {
                                setIsOtherPackages(false);
                                setPackageCategory(pack.name);
                                setItemDesc('')
                              }}
                              active={packageCategory === pack.name}
                            >
                              {pack.name}
                            </Button>
                          )
                        })}

                      </ButtonGroup>
                      <br />

                      {packageCategory === 'Lainnya' &&
                        <>
                          <label htmlFor="package-description">{t('otherDescription')}</label>
                          <input
                            type="text"
                            id="package-description"
                            name="package-description"
                            className={errors.itemDesc ? 'error' : ''}
                            placeholder={t('otherDescription')}
                            // value={itemDesc} 
                            onInput={(e) => { setItemDesc(e.target.value) }}
                            {...register("itemDesc", {
                              required: true,
                            })}
                          />
                          <br />
                          {errors?.itemDesc?.type === "required" && <p>{t('fieldRequired')}</p>}
                        </>
                      }

                      <h6
                        className="custom-size-btn"
                        onClick={() => {
                          setIsCustomeSize(!isCustomeSize)
                          setPackageSize("")
                        }}
                      >
                        {isCustomeSize ? t('quickFillBtn') : t('customeSizeBtn')}
                      </h6>

                      {isCustomeSize ?
                        <>
                          <label htmlFor="weight-package">{t('weight')}</label>
                          <input
                            type="text"
                            id="weight-package"
                            name="weight-package"
                            className={errors.weight ? 'error' : ''}
                            placeholder={t('weightPlaceholder')}
                            // value={weight} 
                            onInput={(e) => { setWeight(e.target.value) }}
                            {...register("weight", {
                              required: true,
                              pattern: /^[0-9]/,
                              validate: value => value <= 30 || t('weightPlaceholder')
                            })}
                          />
                          <br />
                          {errors?.weight?.type === "required" && <p>{t('fieldRequired')}</p>}
                          {errors?.weight?.type === "pattern" &&
                            <p>{t('numbersOnly')}</p>
                          }
                          {errors?.weight?.type === "validate" &&
                            <p>{errors.weight.message}</p>
                          }


                          <label htmlFor="lenght">{t('length')}</label>
                          {errors?.lenght?.type === "required" &&
                            <label htmlFor="length" className="label-error">{t('fieldRequired')}</label>
                          }
                          {errors?.lenght?.type === "pattern" &&
                            <label htmlFor="length" className="label-error">{t('numbersOnly')}</label>
                          }
                          {errors?.lenght?.type === "validate" &&
                            <label htmlFor="length" className="label-error">{t('lengthPlaceholder')}</label>
                          }
                          <input
                            type="text"
                            id="lenght"
                            name="lenght"
                            className={errors.lenght ? 'error' : ''}
                            placeholder={t('lengthPlaceholder')}
                            // value={lenght} 
                            onInput={(e) => { setLenght(e.target.value) }}
                            {...register("lenght", {
                              required: true,
                              pattern: /^[0-9]/,
                              validate: value => value <= 58 || t('lengthPlaceholder')
                            })}
                          />


                          <label htmlFor="width">{t('width')}</label>
                          {errors?.width?.type === "required" &&
                            <label htmlFor="width" className="label-error">{t('fieldRequired')}</label>
                          }
                          {errors?.width?.type === "pattern" &&
                            <label htmlFor="width" className="label-error">{t('numbersOnly')}</label>
                          }
                          {errors?.width?.type === "validate" &&
                            <label htmlFor="width" className="label-error">{t('widthPlaceholder')}</label>
                          }
                          <input
                            type="text"
                            id="width"
                            name="width"
                            className={errors.width ? 'error' : ''}
                            placeholder={t('widthPlaceholder')}
                            // value={width} 
                            onInput={(e) => { setWidth(e.target.value) }}
                            {...register("width", {
                              required: true,
                              pattern: /^[0-9]/,
                              validate: value => value <= 32 || t('widthPlaceholder')
                            })}
                          />

                          <label htmlFor="height">{t('height')}</label>
                          {errors?.height?.type === "required" &&
                            <label htmlFor="height" className="label-error">{t('fieldRequired')}</label>
                          }
                          {errors?.height?.type === "pattern" &&
                            <label htmlFor="height" className="label-error">{t('numbersOnly')}</label>
                          }
                          {errors?.height?.type === "validate" &&
                            <label htmlFor="height" className="label-error">{t('heightPlaceholder')}</label>
                          }
                          <input
                            type="text"
                            id="height"
                            name="height"
                            className={errors.height ? 'error' : ''}
                            placeholder={t('heightPlaceholder')}
                            // value={height} 
                            onInput={(e) => { setHeight(e.target.value) }}
                            {...register("height", {
                              required: true,
                              pattern: /^[0-9]/,
                              validate: value => value <= 42 || t('heightPlaceholder')
                            })}
                          />
                          <br />
                        </>
                        :
                        <>
                          <label for="package-size">{t('packagesSize')}</label>
                          <ButtonGroup className="package-size">
                            {sizeData.map((size, index) => {
                              return (
                                <Button
                                  color="primary"
                                  outline
                                  className="package-choices"
                                  onClick={() => {
                                    setPackageSize(size?.name);
                                    setWeight(size?.weight)
                                    setHeight(size?.height)
                                    setWidth(size?.width)
                                    setLenght(size?.lenght)
                                    setValue('weight', size?.weight)
                                    setValue('height', size?.height)
                                    setValue('width', size?.width)
                                    setValue('lenght', size?.lenght)
                                  }}
                                  active={packageSize === size.name}
                                >
                                  <h5
                                    style={{
                                      margin: 0,
                                      marginBottom: "0.5rem",
                                      fontSize: '1rem'
                                    }}
                                  >{size.name}</h5>
                                  <h6
                                    style={{
                                      margin: 0,
                                      fontSize: '0.8rem'
                                    }}
                                  >{t('max')} {size?.weight} KG, {size?.volume}L</h6>
                                </Button>
                              )
                            })}

                          </ButtonGroup>
                          <br />
                        </>
                      }




                      <label htmlFor="temperature" id="temperature-label">{t('temperature')}</label>
                      <div className="range">
                        <Slider
                          min={-22}
                          max={10}
                          marks={{
                            '-22': '-22°C',
                            '-14': '-14°C',
                            '-6': '-6°C',
                            2: '2°C',
                            10: '10°C'
                          }}
                          defaultValue={temperature}
                          value={temperature}
                          trackStyle={{
                            backgroundColor: '#6EB9E3',
                            height: '0.5rem'
                          }}
                          railStyle={{
                            backgroundColor: '#E1EAF6',
                            height: '0.5rem',
                          }}
                          handleStyle={{
                            borderColor: '#1F83BB',
                            height: '1.1rem',
                            width: '1.1rem',
                            // height: 28,
                            // width: 28,
                            opacity: 1,
                            backgroundColor: '#1F83BB',
                          }}
                          onChange={(e) => setTemperature(e)}
                        />
                        <h6>{temperature}&deg; C</h6>
                      </div>
                      <br />
                    </div>
                  </div>
                  : null
                }
              </div>
            </div>
            <div className={`detail-footer ${point === 'Drop' && selectedService !== 'superkul-truck' ? 'fix-bottom' : ''}`}>
              <div className="back btn" onClick={cancelPoint}>{t('back').toUpperCase()}</div>
              <button type="submit" className="save btn btn-primary" >{t('save').toUpperCase()}</button>
            </div>
            {/* </div> */}
          </form>
        </div>
        {orderAllow && location.length > 1 ?
          <div className="footer-order">
            <button className={`order-1 btn btn-primary`} onClick={handleCreateOrder}>{t('order')}</button>
          </div>
          :
          <div className="footer-order disable">
            <button disabled className={`order-1 btn btn-primary disable`} onClick={handleCreateOrder}>{t('order')}</button>
          </div>
        }
      </div>
      <div className="maps-side">
        {/* <div className="navbar-maps">
          <img src={Logo} alt="logo superkull" />
        </div> */}
        <Header />
        <div className="maps-view">
          <div style={{ positon: 'relative' }}>
            <div className="maps">
              <GoogleMap
                center={center}
                zoom={11}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false
                }}
                onLoad={(map) => setMap(map)}
              >
                {location.map((data, index) => {
                  if (data === undefined) {
                    return null
                  } else {
                    if (data.point === '') {
                      return (
                        <>
                          <Marker
                            position={data.latlng}
                            draggable={targetLocationId === data.locationId ? true : false}
                            onDragEnd={(e) => dragEnd(e, data.locationId)}
                            icon={GrayIcon}
                          >
                            {/* <InfoWindow position={data.latlng}>
                              <div>{data.point}</div>
                            </InfoWindow> */}
                          </Marker>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <Marker
                            position={data.latlng}
                            draggable={targetLocationId === data.locationId ? true : false}
                            onDragEnd={(e) => dragEnd(e, data.locationId)}
                            icon={data.point === 'Pick' ? PickupIcon : DropIcon}
                          >
                            {/* <InfoWindow position={data.latlng}>
                              <div>{data.point}</div>
                            </InfoWindow> */}
                          </Marker>
                          <OverlayView position={data.latlng} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
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
                                fontSize: '0.75rem'
                              }}
                            >
                              {Object.keys(data.latlng).length === 0 ? '' : index}
                            </div>
                          </OverlayView>
                        </>
                      )
                    }
                  }
                })}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
