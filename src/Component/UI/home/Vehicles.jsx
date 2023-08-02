import React from "react";
import { useState } from "react";
import bike from "../../../assets/img/vehicle.png";
// import truckL300 from "../../../assets/img/truck-l300-soon.png";
// import truckCde from "../../../assets/img/truck-cde.png";
// import truckCdd from "../../../assets/img/truck-cdd-soon.png";
// import blindVan from "../../../assets/img/blind-van-soon.png";
import imgCdd from "../../../assets/img/img_cdd.png";
import imgCddLong from "../../../assets/img/img_cdd_long.png";
import imgCde from "../../../assets/img/img_cde.png";
import imgtj from "../../../assets/img/img_te.png";
import imgtb from "../../../assets/img/img_wingbox.png";
import "../../../styles/Vehicles/vehicles.scss";
import { useTranslation } from "react-i18next";
import { Row, Col } from "reactstrap";

export const Vehicles = () => {
  const { t } = useTranslation();
  const [tabSelected, setTabSelected] = useState(1);
  const [listSelected, setListSelected] = useState({
    id: 1,
    name: "Bike",
    imgUrl: bike,
    vehicleInfo: {
      weightMax: "30Kg",
      dimension: "80L (58cm x 32cm x 42cm)",
      temperature: "-22&deg;C sampai 10&deg;C",
    },
    sameDayDelivery: {
      priceMin: "Rp 12.000",
      distance: "2 km - 50 km antar titik",
      timeDeliv: "Hingga 8 Jam",
      tarif: {
        1: "Rp. 3.500,- per kilometer",
        2: "Rp. 5.000,- (Handling Fee)",
      },
      area: "Jakarta, Bogor, Depok, Tangerang and Bekasi",
      servicePlusPlus: [
        "Kamu dapat mengatur jadwal pengiriman kamu.",
        "Kamu dapat melakukan pengiriman multiple pickup & multiple drop dalam satu order.",
        "Kamu dapat lebih hemat dengan menggunakan fitur route optimization.",
      ],
      moreService: [],
    },
    instantDelivery: {
      minPrice: "Rp 13.000",
      distance: "2 km - 50 km antar titik",
      timeDeliv: "Hingga 2 Jam",
      tarif: {
        1: "Rp. 4.000,- per kilometer",
        2: "Rp. 5.000,- per Drop",
      },
      area: "Jakarta, Bogor, Depok, Tangerang, Bekasi, dan Bandung",
      servicePlusPlus: [
        "Kamu bisa mengantarkan paketmu saat ini juga. Selesaikan pembuatan ordermu, dan driver langsung menuju ke lokasi pickup.",
      ],
      moreService: [],
    },
    dedicatedService: {
      tarif: {
        1: "Superkul Bike only : Rp. 150.000",
        2: "Superkul Bike & Driver : Rp. 300.000",
      },
      area: "Jakarta, Bogor, Depok, Tangerang, Bekasi, dan Bandung",
      servicePlusPlus: [
        "Kamu hanya perlu bayar sekali, dan driver/motor Superkul akan dedicated untuk mengirimkan orderan kamu.",
        "Tidak perlu takut orderan kamu tidak dapat driver.",
      ],
      moreService: [],
    },
  });
  const vehicleList = [
    {
      id: 1,
      name: "Bike",
      imgUrl: bike,
      vehicleInfo: {
        weightMax: "30Kg",
        dimension: "80L (58cm x 32cm x 42cm)",
        temperature: "-22°C sampai 10°C",
      },
      sameDayDelivery: {
        priceMin: "Rp 12.000",
        distance: "2 km - 50 km antar titik",
        timeDeliv: "Hingga 8 Jam",
        tarif: {
          1: "Rp. 3.500,- per kilometer",
          2: "Rp. 5.000,- (Handling Fee)",
        },
        area: "Jakarta, Bogor, Depok, Tangerang and Bekasi",
        servicePlusPlus: [
          "Kamu dapat mengatur jadwal pengiriman kamu.",
          "Kamu dapat melakukan pengiriman multiple pickup & multiple drop dalam satu order.",
          "Kamu dapat lebih hemat dengan menggunakan fitur route optimization.",
        ],
        moreService: [],
      },
      instantDelivery: {
        minPrice: "Rp 13.000",
        distance: "2 km - 50 km antar titik",
        timeDeliv: "Hingga 2 Jam",
        tarif: {
          1: "Rp. 4.000,- per kilometer",
          2: "Rp. 5.000,- per Drop",
        },
        area: "Jakarta, Bogor, Depok, Tangerang, Bekasi, dan Bandung",
        servicePlusPlus: [
          "Kamu bisa mengantarkan paketmu saat ini juga. Selesaikan pembuatan ordermu, dan driver langsung menuju ke lokasi pickup.",
        ],
        moreService: [],
      },
      dedicatedService: {
        tarif: {
          1: "Superkul Bike only : Rp. 150.000",
          2: "Superkul Bike & Driver : Rp. 300.000",
        },
        area: "Jakarta, Bogor, Depok, Tangerang, Bekasi, dan Bandung",
        servicePlusPlus: [
          "Kamu hanya perlu bayar sekali, dan driver/motor Superkul akan dedicated untuk mengirimkan orderan kamu.",
          "Tidak perlu takut orderan kamu tidak dapat driver.",
        ],
        moreService: [],
      },
    },
    {
      id: 6,
      name: "Truck CDE Standard",
      imgUrl: imgCde,
      vehicleInfo: {
        weightMax: "2 Tonnes",
        dimension: "(290 cm x 150 cm x 150 cm)",
        temperature: "-22°C  sampai 10°C",
        area: "Jawa, Bali",
        tarif: "Mulai dari Rp 975.000",
        tarifPlus: [
          "Mulai dari Rp,70.000 untuk Intracity",
          "Mulai dari  Rp,120.000 untuk Intercity",
        ],
        servicePlusPlus: [
          "Kamu dapat melakukan multiple drop dalam satu order trip.",
          "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
          "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
          "Suhu dapat diatur sesuai dengan kebutuhan.",
        ],
      },
    },
    {
      id: 7,
      name: "Truck CDE Long",
      imgUrl: imgCde,
      vehicleInfo: {
        weightMax: "3 Tonnes",
        dimension: "(380 cm x 160 cm x 170 cm)",
        temperature: "-22°C  sampai 10°C",
        area: "Jawa, Bali",
        tarif: "Mulai dari Rp 975.000",
        tarifPlus: [
          "Mulai dari Rp,70.000 untuk Intracity",
          "Mulai dari  Rp,120.000 untuk Intercity",
        ],
        servicePlusPlus: [
          "Kamu dapat melakukan multiple drop dalam satu order trip.",
          "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
          "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
          "Suhu dapat diatur sesuai dengan kebutuhan.",
        ],
      },
    },
    {
      id: 8,
      name: "Truck CDD Standard",
      imgUrl: imgCdd,
      vehicleInfo: {
        weightMax: "4 Tonnes",
        dimension: "(400 cm x 170 cm x 175 cm)",
        temperature: "-22°C  sampai 10°C",
        area: "Jawa, Sumatra, Bali",
        tarif: "Mulai dari Rp 975.000",
        tarifPlus: [
          "Mulai dari Rp,70.000 untuk Intracity",
          "Mulai dari  Rp,120.000 untuk Intercity",
        ],
        servicePlusPlus: [
          "Kamu dapat melakukan multiple drop dalam satu order trip.",
          "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
          "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
          "Suhu dapat diatur sesuai dengan kebutuhan.",
        ],
      },
    },
    {
      id: 9,
      name: "Truck CDD Long",
      imgUrl: imgCddLong,
      vehicleInfo: {
        weightMax: "5 Tonnes",
        dimension: "(500 cm x 175 cm x 175 cm)",
        temperature: "-22°C  sampai 10°C",
        area: "Jawa, Sumatra, Bali",
        tarif: "Mulai dari Rp 975.000",
        tarifPlus: [
          "Mulai dari Rp,70.000 untuk Intracity",
          "Mulai dari  Rp,120.000 untuk Intercity",
        ],
        servicePlusPlus: [
          "Kamu dapat melakukan multiple drop dalam satu order trip.",
          "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
          "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
          "Suhu dapat diatur sesuai dengan kebutuhan.",
        ],
      },
    },
    {
      id: 10,
      name: "Truck Jumbo",
      imgUrl: imgtj,
      vehicleInfo: {
        weightMax: "15 Tonnes",
        dimension: "(730 cm x 220 cm x 215 cm)",
        temperature: "-22°C  sampai 10°C",
        area: "Jawa, Sumatra, Bali",
        tarif: "Mulai dari Rp 975.000",
        tarifPlus: [
          "Mulai dari Rp,70.000 untuk Intracity",
          "Mulai dari  Rp,120.000 untuk Intercity",
        ],
        servicePlusPlus: [
          "Kamu dapat melakukan multiple drop dalam satu order trip.",
          "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
          "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
          "Suhu dapat diatur sesuai dengan kebutuhan.",
        ],
      },
    },
    {
      id: 11,
      name: "Truck Build",
      imgUrl: imgtb,
      vehicleInfo: {
        weightMax: "20 Tonnes",
        dimension: "(890 cm x 230 cm x 215 cm)",
        temperature: "-22°C  sampai 10°C",
        area: "Jawa, Sumatra, Bali",
        tarif: "Mulai dari Rp 975.000",
        tarifPlus: [
          "Mulai dari Rp,70.000 untuk Intracity",
          "Mulai dari  Rp,120.000 untuk Intercity",
        ],
        servicePlusPlus: [
          "Kamu dapat melakukan multiple drop dalam satu order trip.",
          "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
          "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
          "Suhu dapat diatur sesuai dengan kebutuhan.",
        ],
      },
    },
    // {
    //   id: 2,
    //   name: "Blind Van",
    //   imgUrl: blindVan,
    //   vehicleInfo: {
    //     area: "Jakarta, Bogor, Depok, Tangerang, dan Bekasi.",
    //   },
    // },
    // {
    //   id: 3,
    //   name: "Truck L300",
    //   imgUrl: truckL300,
    //   vehicleInfo: {
    //     weightMax: "1 Ton",
    //     dimension: "(200 cm x 160 cm x 154 cm)",
    //     temperature: "-22°C sampai 10°C",
    //     area: "Jakarta, Bogor, Depok, Tangerang, dan Bekasi.",
    //   },
    // },
    // {
    //   id: 4,
    //   name: "Truck CDE",
    //   imgUrl: truckCde,
    //   vehicleInfo: {
    //     tarif: "Mulai dari Rp 975.000",
    //     tarifPlus: [
    //       "Mulai dari Rp,70.000 untuk Intracity",
    //       "Mulai dari  Rp,120.000 untuk Intercity",
    //     ],
    //     weightMax: "2,5 Ton",
    //     dimension: "(300 cm x 160 cm x 160 cm)",
    //     temperature: "-22°C  sampai 10°C",
    //     area: "Jakarta, Bogor, Depok, Tangerang, dan Bekasi.",
    //     servicePlusPlus: [
    //       "Kamu dapat melakukan multiple drop dalam satu order trip.",
    //       "Sangat cocok untuk penyimpanan sekaligus pengiriman produk yang memerlukan suhu mulai dari  -22°C  sampai 10°C.",
    //       "Memiliki kapasitas yang besar, sehingga memungkinkan untuk melakukan pengiriman dalam jumlah besar.",
    //       "Suhu dapat diatur sesuai dengan kebutuhan.",
    //     ],
    //   },
    // },
    // {
    //   id: 5,
    //   name: "Truck CDD",
    //   imgUrl: truckCdd,
    //   vehicleInfo: {
    //     weightMax: "5 Ton",
    //     dimension: "(420 cm x 200 cm x 180 cm)",
    //     temperature: "-22°C  sampai 10°C",
    //     area: "Jakarta, Bogor, Depok, Tangerang, dan Bekasi.",
    //   },
    // },
  ];

  return (
    <div>
      <div className="container-vehicles">
        <div className="title-vehicle mt-5 mt-md-0 px-5 px-md-0">
          <h1>{t("vehicleSection.howMuch")}</h1>
          <p>{t("vehicleSection.sendAnything")}</p>
        </div>
        <div className="d-block d-md-flex mt-md-5">
          <div className="vehicle-list">
            <p className="ps-3 pt-3">{t("vehicleList")}</p>
            <div className="d-flex d-md-block content-list smooth-scrollbar">
              {vehicleList.map((list, idx) => {
                return (
                  <div
                    key={idx}
                    className={`${
                      listSelected.id === list.id && "list-item-selected"
                    } list-item d-block d-md-flex`}
                    onClick={() => {
                      // if(list.id === 1 || list.id === 4) {
                        setListSelected(list);
                        setTabSelected(1);
                      // }
                    }}
                  >
                    <p className="name text-center d-block d-md-none">
                      {list.name}
                    </p>
                    <img
                      className="list-img"
                      src={list.imgUrl}
                      alt="feature-img"
                    />
                    <div className="list-text d-none d-md-block">
                      <p className="name">{list.name}</p>
                      <p className="detail">{t("viewDetail")} →</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {
            listSelected.name !== "Bike" && (
              <div className="vehicle-desc">
                {/* WINDOW DISPLAY */}
                <div className="d-none d-md-block">
                  <Row >
                    <Col>
                        <div className="ps-3 ps-md-5 pt-4 pb-3 ">
                          <h4> <strong>{listSelected.name.toLocaleUpperCase()}</strong> </h4>
                        </div>
                        <div className="hide-content-in-phone-size" style={{margin:"8vh 0vh"}}>
                          <img src={listSelected.imgUrl} alt="feature-img" />  
                        </div>
                    </Col>
                    <Col>
                      <div style={{margin:"7vh 0vh"}} className="ps-3 ps-md-5 pt-5 pb-3">
                        <h5><strong>{t("vehicleInformation")}</strong></h5>
                        <div className="pt-3">
                          <h6>
                            <strong>{t("dimensions")} (cm)</strong>
                          </h6>
                            <p>{listSelected.vehicleInfo.dimension}</p>
                        </div>
                        <div className="pt-3">
                          <h6>
                            <strong>{t("maximumWeight")}</strong>
                          </h6>
                            <p>{listSelected.vehicleInfo.weightMax}</p>
                        </div>
                        <div className="pt-3">
                          <h6>
                            <strong>{t("temperature")}</strong>
                          </h6>
                            <p>{listSelected.vehicleInfo.temperature}</p>
                        </div>
                        <div className="pt-3">
                          <h6>
                            <strong>{t("deliveryAreas")}</strong>
                          </h6>
                            <p>{listSelected.vehicleInfo.area}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                
                {/* PHONE DISPLAY */}
                <div className="d-md-none sm-12">
                  <Row>
                    <Col xs={12}>
                        <div className="ps-3 ps-md-5 ">
                          <p> <strong>{listSelected.name.toLocaleUpperCase()}</strong> </p>
                        </div>
                        <div  style={{margin:"0vh 10vh"}}>
                          <img src={listSelected.imgUrl} height={100} alt="feature-img" />  
                        </div>
                    </Col>
                    <Col xs={12}>
                      <div style={{margin:"0vh 0vh"}} className="ps-3 ps-md-5 pb-3">
                          <p><strong>{t("vehicleInformation")}</strong></p>
                          <div className="small-font">
                            <p>
                              <strong>{t("dimensions")} (cm)</strong>
                            </p>
                              <p>{listSelected.vehicleInfo.dimension}</p>
                          </div>
                          <div className="small-font">
                            <p>
                              <strong>{t("maximumWeight")}</strong>
                            </p>
                              <p>{listSelected.vehicleInfo.weightMax}</p>
                          </div>
                          <div className="small-font">
                            <p>
                              <strong>{t("temperature")}</strong>
                            </p>
                              <p>{listSelected.vehicleInfo.temperature}</p>
                          </div>
                          <div className="small-font">
                            <p>
                              <strong>{t("deliveryAreas")}</strong>
                            </p>
                              <p>{listSelected.vehicleInfo.area}</p>
                          </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                
              </div>
            )
          }
          {
            listSelected.name === "Bike" && (
              <div className="vehicle-desc">
                <div className="tabs">
                  <span
                    className={tabSelected === 1 && "span-selected"}
                    onClick={() => {
                      setTabSelected(1);
                    }}
                  >
                    Info Kendaran
                  </span>
                  <span
                    className={tabSelected === 2 && "span-selected"}
                    onClick={() => {
                      listSelected.name === "Bike" && setTabSelected(2);
                    }}
                  >
                    Sameday Delivery
                  </span>
                  <span
                    className={tabSelected === 3 && "span-selected"}
                    onClick={() => {
                      listSelected.name === "Bike" && setTabSelected(3);
                    }}
                  >
                    Instant Delivery
                  </span>
                  <span
                    className={tabSelected === 4 && "span-selected"}
                    onClick={() => {
                      listSelected.name === "Bike" && setTabSelected(4);
                    }}
                  >
                    Dedicated Service
                  </span>
                </div>
                <div className="smooth-scrollbar vehicle-content">
                  {tabSelected === 1 && (
                    <div class="mt-md-1">
                      <div className="d-flex flex-wrap align-items-center justify-content-center gap-5">
                        <div class=" content-img2">
                          <img src={listSelected.imgUrl} alt="feature-img" />
                        </div>
                        <div class=" content-img1">
                          <img src={listSelected.imgUrl} alt="feature-img" />
                        </div>
                      </div>
                      <div className="ps-3 ps-md-5 pt-4 pb-3 info-vehicles">
                        <p className="title">
                          Info Kendaraan {listSelected.name ?? "-"}
                        </p>
                        {listSelected.name === "Bike" ? (
                          <div className="d-block d-md-flex justify-content-between">
                            <div>
                              <p className="subtitle">Berat Maksimal</p>
                              <p className="desc">
                                {listSelected?.vehicleInfo?.weightMax ?? "-"}
                              </p>
                            </div>
                            <div className="mt-3 mt-md-0">
                              <p className="subtitle">Batas Ukuran (PxLxT)</p>
                              <p className="desc">
                                {listSelected?.vehicleInfo?.dimension ?? "-"}
                              </p>
                            </div>
                            <div className="mt-3 mt-md-0">
                              <p className="subtitle">Temperature Range</p>
                              <p className="desc">
                                {listSelected?.vehicleInfo?.temperature ?? "-"}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="content-truck">
                            <div>
                              <div className="row">
                                <div className="col-4">
                                  <p className="subtitle">Tarif Dasar</p>
                                  <p className="desc">
                                    {listSelected?.vehicleInfo?.tarif ?? "-"}
                                  </p>
                                </div>
                                <div className="col-5 mt-2 mt-md-0">
                                  <p className="subtitle">Tarif Tambahan</p>
                                  {listSelected?.vehicleInfo?.tarifPlus?.length >
                                  0 ? (
                                    listSelected?.vehicleInfo?.tarifPlus?.map(
                                      (el) => {
                                        return <p className="desc">{el}</p>;
                                      }
                                    )
                                  ) : (
                                    <p className="mb-0">-</p>
                                  )}
                                </div>
                                <div className="col-3 mt-2 mt-md-0">
                                  <p className="subtitle">Berat Maksimal</p>
                                  <p className="desc">
                                    {listSelected?.vehicleInfo?.weightMax ?? "-"}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-md-3">
                                <div className="col-4 mt-2 mt-md-0">
                                  <p className="subtitle">Batasan Ukuran (PxLxT)</p>
                                  <p className="desc">
                                    {listSelected?.vehicleInfo?.dimension ?? "-"}
                                  </p>
                                </div>
                                <div className="col-5 mt-2 mt-md-0">
                                  <p className="subtitle">Kisaran Suhu</p>
                                  <p className="desc">
                                    {listSelected?.vehicleInfo?.temperature ?? "-"}
                                  </p>
                                </div>
                                <div className="col-3 mt-2 mt-md-0">
                                  <p className="subtitle">Area Pengiriman</p>
                                  <p className="desc">
                                    {listSelected?.vehicleInfo?.area ?? "-"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="title mt-5">Kelebihan Layanan</p>
                            <div>
                              {listSelected?.vehicleInfo?.servicePlusPlus?.length >
                              0 ? (
                                <ul>
                                  {listSelected?.vehicleInfo?.servicePlusPlus?.map(
                                    (el, idx) => {
                                      return <li key={idx}>{el}</li>;
                                    }
                                  )}
                                </ul>
                              ) : (
                                "-"
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {tabSelected === 2 && (
                    <div className="ps-3 ps-md-5 pt-4 pb-3 sameday-delivery">
                      <p className="title">
                        Sameday Delivery Service {listSelected?.name}
                      </p>
                      <div className="info-vehicles">
                        <div className="row justify-content-between">
                          <div className="col-12 col-md-4">
                            <p className="subtitle">Biaya Minimal</p>
                            <p className="desc">
                              {listSelected?.sameDayDelivery?.priceMin ?? "-"}
                            </p>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <p className="subtitle">Jarak</p>
                            <p className="desc">
                              {listSelected?.sameDayDelivery?.distance ?? "-"}
                            </p>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <p className="subtitle">Waktu Pengiriman</p>
                            <p className="desc">
                              {listSelected?.sameDayDelivery?.timeDeliv ?? "-"}
                            </p>
                          </div>
                        </div>
                        <div className="row justify-content-start mt-4">
                          <div className="col-12 col-md-4">
                            <p className="subtitle">Tarif</p>
                            <p className="desc">
                              {listSelected?.sameDayDelivery?.tarif?.[1] ?? "-"}
                            </p>
                            <p className="desc">
                              {listSelected?.sameDayDelivery?.tarif?.[2] ?? "-"}
                            </p>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <p className="subtitle">Area Pengiriman</p>
                            <p className="desc">
                              {listSelected?.sameDayDelivery?.area ?? "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="title mt-5">Kelebihan Layanan</p>
                      <div>
                        {listSelected?.sameDayDelivery?.servicePlusPlus.length >
                        0 ? (
                          <ul>
                            {listSelected?.sameDayDelivery?.servicePlusPlus?.map(
                              (el, idx) => {
                                return <li key={idx}>{el}</li>;
                              }
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </div>
                      <p className="title mt-5">Layanan Tambahan</p>
                      <div>
                        {listSelected?.sameDayDelivery?.moreService.length > 0 ? (
                          <ul>
                            {listSelected?.sameDayDelivery?.moreService?.map(
                              (el, idx) => {
                                return <li key={idx}>{el}</li>;
                              }
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  )}
                  {tabSelected === 3 && (
                    <div className="ps-3 ps-md-5 pt-4 pb-3 sameday-delivery">
                      <p className="title">
                        Instant Delivery Service {listSelected?.name}
                      </p>
                      <div className="info-vehicles">
                        <div className="row justify-content-between">
                          <div className="col-12 col-md-4">
                            <p className="subtitle">Biaya Minimal</p>
                            <p className="desc">
                              {listSelected?.instantDelivery?.minPrice ?? "-"}
                            </p>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <p className="subtitle">Jarak</p>
                            <p className="desc">
                              {listSelected?.instantDelivery?.distance ?? "-"}
                            </p>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <p className="subtitle">Waktu Pengiriman</p>
                            <p className="desc">
                              {listSelected?.instantDelivery?.timeDeliv ?? "-"}
                            </p>
                          </div>
                        </div>
                        <div className="row justify-content-start mt-4">
                          <div className="col-12 col-md-4">
                            <p className="subtitle">Tarif</p>
                            <p className="desc">
                              {listSelected?.instantDelivery?.tarif?.[1] ?? "-"}
                            </p>
                            <p className="desc">
                              {" "}
                              {listSelected?.instantDelivery?.tarif?.[2] ?? "-"}
                            </p>
                          </div>
                          <div className="col-12 col-md-4 mt-3 mt-md-0">
                            <p className="subtitle">Area Pengiriman</p>
                            <p className="desc">
                              {listSelected?.instantDelivery?.area ?? "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="title mt-5">Kelebihan Layanan</p>
                      <div>
                        {listSelected?.instantDelivery?.servicePlusPlus.length >
                        0 ? (
                          <ul>
                            {listSelected?.instantDelivery?.servicePlusPlus?.map(
                              (el, idx) => {
                                return <li key={idx}>{el}</li>;
                              }
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </div>
                      <p className="title mt-5">Layanan Tambahan</p>
                      <div>
                        {listSelected?.instantDelivery?.moreService.length > 0 ? (
                          <ul>
                            {listSelected?.instantDelivery?.moreService?.map(
                              (el, idx) => {
                                return <li key={idx}>{el}</li>;
                              }
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  )}
                  {tabSelected === 4 && (
                    <div className="ps-3 ps-md-5 pt-4 pb-3 sameday-delivery">
                      <p className="title">
                        Dedicated Service {listSelected?.name}
                      </p>
                      <div className="info-vehicles">
                        <div className="row justify-content-between">
                          <div className="col-4">
                            <p className="subtitle">Tarif (Flat per hari)</p>
                            <p className="desc">
                              {listSelected?.dedicatedService?.tarif?.[1] ?? "-"}
                            </p>
                            <p className="desc">
                              {listSelected?.dedicatedService?.tarif?.[2] ?? "-"}
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 mt-3 mt-md-3">
                          <p className="subtitle">Area Pengiriman</p>
                          <p className="desc">
                            {listSelected?.dedicatedService?.area ?? "-"}
                          </p>
                        </div>
                      </div>

                      <p className="title mt-5">Kelebihan Layanan</p>
                      <div>
                        {listSelected?.dedicatedService?.servicePlusPlus.length >
                        0 ? (
                          <ul>
                            {listSelected?.dedicatedService?.servicePlusPlus?.map(
                              (el, idx) => {
                                return <li key={idx}>{el}</li>;
                              }
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </div>
                      <p className="title mt-5">Layanan Tambahan</p>
                      <div>
                        {listSelected?.dedicatedService?.moreService.length > 0 ? (
                          <ul>
                            {listSelected?.dedicatedService?.moreService?.map(
                              (el, idx) => {
                                return <li key={idx}>{el}</li>;
                              }
                            )}
                          </ul>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
