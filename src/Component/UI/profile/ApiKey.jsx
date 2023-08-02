import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../../styles/apikey/apikey.scss'
import { numberFormat } from '../../numberFormat/numberFormat'
import CopyIcon from "../../../assets/icon/ic-copy.png";
import { AccordionBody, AccordionHeader, AccordionItem, Button, Col, Container, PopoverBody, Row, UncontrolledAccordion, UncontrolledPopover } from 'reactstrap';
import { sendGetRequest, sendPostRequest, sendPostRequestMobile } from '../../../services/request-adapter';
import { AuthContext } from '../../authContext/AuthContext';
import { errorPopup } from '../modal/PopUp/ErrorPopUp';

export const ApiKey = () => {
  const { t } = useTranslation()
  const auth = useContext(AuthContext)
  const [apiKey, setApiKey] = useState('-')
  const [callbackURL, setCallbackURL] = useState({})
  const exampleData = [
    {
      "externalId": "TEST0001",
      "orderId": "a8hdnx99babcbabai2829aba",
      "orderNumber": "SD-2023032408c2",
      "serviceName": "Sameday Delivery",
      "invoiceNumber": "INV-SD-2023032408c2",
      "orderStatus": "SCHEDULED",
      "trip": {
        "trip 1": {
          "tripNumber": "SD-2023032408c2-TR0",
          "tripStatus": "Mencari Driver"
        },
        "trip 2": {
          "tripNumber": "SD-2023032408c2-TR1",
          "tripStatus": "Mencari Driver"
        }
      }
    }
  ]

  const getApiKey = async () => {
    try {
      const { data } = await sendPostRequest(`/corporates/token?id=${auth.id}`)
      auth.storeApiKey(data.api_token)
    } catch (error) {
      console.log(error.message)
      errorPopup(t('error'),t('somethingError'), t('close'))
    }
  }
  const handleTestCallback = async (key) => {
    // callbackURL.orderSuccessURL

    const payload = {
      url : callbackURL.orderSuccessURL
    }

    switch (key) {
      case 'orderSuccess':
        // const url = 
        payload = {
          url : callbackURL.orderSuccessURL
        }
        
        break;
    
      default:
        break;
    }

    try {
      const { data } = await sendPostRequestMobile(`/api/test-callback`, payload)
    } catch (error) {
      console.log(error.message)
      errorPopup(t('error'),t('somethingError'), t('close'))
    }
  }

  return (
    <>
      <div className="dev-opt">
        <div className="header-apikey">Api Key</div>
        <div className="body-apikey">
          <div className="list-apikey"
            style={{
              alignContent: 'center'
            }}
          >
            <p className="title-apikey">Key</p>
            <p className="detail-apikey">{auth.apiKey}
              <Button
                id="PopoverFocus"
                type="button"
                style={{
                  padding: 0,
                  backgroundColor: 'white',
                  border: 'none',
                  marginTop: '-0.1rem',
                  marginLeft: '1rem',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={CopyIcon} 
                  alt="" 
                  id="PopoverFocus"
                  
                  onClick={() => navigator.clipboard.writeText(auth.apiKey)}
                />
              </Button>
              <UncontrolledPopover
                placement="right"
                target="PopoverFocus"  
                trigger='focus'      
              >
                <PopoverBody>
                  Copied!
                </PopoverBody>
              </UncontrolledPopover>
            </p>
          </div>
        </div>
        <Button 
          onClick={getApiKey}
          style={{
            backgroundColor: '#1F83BB',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: 'none'
          }}
        >Generate Key</Button>
        <br />
        <br />
        <br />
        <div className="body-callback">
          <h1 className="title-callback">
            Callback URL
          </h1>
          <Container className='title-container'>
            <Row xs="2" className='table-title'>
              <Col xs="5">
                Product
              </Col>
              <Col xs="7">
                Callback URL
              </Col>
            </Row>
            <Row xs="2" className='product'>
              <Col xs="5" className='title d-flex align-items-center'>
                Order Success
              </Col>
              <Col xs="7" className='input d-flex justify-content-between align-items-center'>
                <input 
                  type="text" 
                  placeholder='https://example.com'
                  className='w-50'
                  onChange={(e) => setCallbackURL({...callbackURL, orderSuccessURL: e.target.value})}
                />
                <Button className='callback-test-button' onClick={handleTestCallback}>Test and Save</Button>
              </Col>
            </Row>
            <Row xs="1" className='example-payload'>
              <h4>Request</h4>
              <h6>Example callback payload <i>{'(Sameday Delivery)'}</i></h6>
              <div>
                <pre className="payload">
                  {JSON.stringify(exampleData[0], null, 2)}
                </pre>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}
