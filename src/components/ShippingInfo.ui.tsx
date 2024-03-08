import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Dropdown, Input, Label, UiEntity } from '@dcl/sdk/react-ecs'
import { PlaceOrderDetails, Shipping, UserData } from '../types'
import {
  CONTAINER_BASE_PROPS,
  INPUT_FONT_SIZE,
  INPUT_TRANSFORM,
  LABEL_FONT_SIZE,
  LABEL_TRANSFORM,
  MODAL_RIGHT_SIZE,
  MODAL_SIZE
} from '../utils'

import ModalHeader from './ModalHeader.ui'
import ModalFormContainer from './ModalFormContainer.ui'
import ModalFooter from './ModalFooter.ui'
import ModalStep from './ModalStep.ui'
import ModalLeft from './ModalLeft'
import ModalClose from './ModalClose.ui'
interface ShippingInfoProps {
  closeModal: () => void
  placeOrderDetails: PlaceOrderDetails
  goToBillingInfo: () => void
  goBackToArticle: () => void
  userData: UserData
}

let hasErrors = false
let hasUserData = false
let hasSaveData = false
let selectedAddressIndex = 0

const fields: {
  key: keyof Shipping
  label: string
  required: boolean
}[] = [
  {
    key: 'address1',
    label: 'Address 1 *',
    required: true
  },
  {
    key: 'address2',
    label: 'Address 2',
    required: false
  },
  {
    key: 'city',
    label: 'City *',
    required: true
  },
  {
    key: 'state',
    label: 'State*',
    required: true
  },
  {
    key: 'postcode',
    label: 'Postcode *',
    required: true
  },
  {
    key: 'country',
    label: 'Country *',
    required: true
  }
]

export const ShippingInfo = ({
  closeModal,
  placeOrderDetails,
  goToBillingInfo,
  goBackToArticle,
  userData
}: ShippingInfoProps) => {
  // console.log('data', userData)

  const validateShippingInfo = () => {
    hasErrors = false
    const { address1, city, state, country, postcode } = placeOrderDetails.shipping
    if (!address1 || !city || !state || !country || !postcode) {
      hasErrors = true
    } else {
      goToBillingInfo()
    }
  }

  const setDefaultShipping = (address: any) => {
    const shippingFields: (keyof Shipping)[] = [
      'firstName',
      'lastName',
      'address1',
      'address2',
      'city',
      'state',
      'postcode',
      'country'
    ]

    shippingFields.forEach((field) => {
      placeOrderDetails.shipping[field] = address[field]
    })
  }
  const handleDropdownChange = (e: number) => {
    selectedAddressIndex = e
    let selectedAddress = userData?.shippingAddress[selectedAddressIndex]
    setDefaultShipping(selectedAddress)
  }

  const handleCheckboxClick = () => {
    hasUserData = !hasUserData
    hasSaveData = false

    if (hasUserData) {
      let selectedAddress = userData?.shippingAddress[selectedAddressIndex]
      setDefaultShipping(selectedAddress)
    } else {
      const shippingFields: (keyof Shipping)[] = [
        'firstName',
        'lastName',
        'address1',
        'address2',
        'city',
        'state',
        'postcode',
        'country'
      ]

      shippingFields.forEach((field) => {
        placeOrderDetails.shipping[field] = ''
      })
    }
  }

  const handleCheckboxSaveClick = () => {
    hasSaveData = !hasSaveData
    placeOrderDetails.saveShipping = hasSaveData
  }
  console.log('place order', placeOrderDetails)
  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <UiEntity
        uiTransform={{
          justifyContent: 'space-between',
          width: MODAL_SIZE.width,
          height: MODAL_SIZE.height
        }}
      >
        <ModalLeft imageSrc="images/contact/Contact.png" />
        <UiEntity
          uiTransform={{
            width: MODAL_RIGHT_SIZE.width,
            height: MODAL_RIGHT_SIZE.height,
            flexDirection: 'column'
          }}
          uiBackground={{ color: Color4.fromHexString('#E5E5E5') }}
        >
          <ModalStep step={1} />
          <ModalHeader title="Shipping Info" subtitle="Please fill your delivery information" />

          <UiEntity uiTransform={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <ModalFormContainer
              children={fields.map((field) => {
                return (
                  <UiEntity uiTransform={CONTAINER_BASE_PROPS} key={field.key}>
                    <Label
                      value={field.label}
                      fontSize={LABEL_FONT_SIZE}
                      textAlign="top-left"
                      color={
                        hasErrors && field.required && !placeOrderDetails.shipping[field.key]
                          ? Color4.Red()
                          : Color4.Black()
                      }
                      uiTransform={LABEL_TRANSFORM}
                    />

                    <Input
                      value={
                        hasUserData
                          ? userData?.shippingAddress[selectedAddressIndex]?.[field.key]
                          : placeOrderDetails.shipping[field.key]
                      }
                      onChange={(e: string) => {
                        placeOrderDetails.shipping[field.key] = e
                      }}
                      uiTransform={INPUT_TRANSFORM}
                      fontSize={INPUT_FONT_SIZE}
                      color={Color4.Black()}
                      disabled={hasUserData}
                    />
                  </UiEntity>
                )
              })}
            />
            <UiEntity
              uiTransform={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
                alignItems: 'center',
                padding: { top: 15 }
              }}
            >
              {userData?.shippingAddress.length > 0 && (
                <UiEntity
                  uiTransform={{
                    display: 'flex',
                    width: '80%'
                  }}
                >
                  <UiEntity
                    onMouseDown={handleCheckboxClick}
                    uiTransform={{
                      width: 15,
                      height: 30
                    }}
                    uiBackground={{
                      textureMode: 'center',
                      texture: {
                        src: hasUserData ? 'images/contact/CheckBoxFilled.png' : 'images/contact/CheckBoxEmpty.png'
                      }
                    }}
                  />
                  <UiEntity
                    onMouseDown={handleCheckboxClick}
                    uiTransform={{ width: 80, height: 30 }}
                    uiText={{ value: 'My address', color: Color4.fromHexString('#1C1C1C'), fontSize: 12 }}
                  />
                </UiEntity>
              )}
              {hasUserData && userData?.shippingAddress.length > 0 && (
                <UiEntity
                  uiTransform={{
                    width: '80%',
                    height: '100%'
                  }}
                >
                  <Dropdown
                    options={userData?.shippingAddress.map((address) => `${address.id}-${address.address1}`)}
                    onChange={handleDropdownChange}
                    uiTransform={{
                      width: '100%',
                      height: '40px'
                    }}
                  />
                </UiEntity>
              )}
              {!hasUserData && (
                <UiEntity uiTransform={{ display: 'flex', width: '80%' }}>
                  <UiEntity
                    onMouseDown={handleCheckboxSaveClick}
                    uiTransform={{
                      width: 15,
                      height: 30
                    }}
                    uiBackground={{
                      textureMode: 'center',
                      texture: {
                        src: hasSaveData ? 'images/contact/CheckBoxFilled.png' : 'images/contact/CheckBoxEmpty.png'
                      }
                    }}
                  />
                  <UiEntity
                    onMouseDown={handleCheckboxSaveClick}
                    uiTransform={{ width: 80, height: 30 }}
                    uiText={{ value: 'Save data', color: Color4.fromHexString('#1C1C1C'), fontSize: 12 }}
                  />
                </UiEntity>
              )}
            </UiEntity>
          </UiEntity>
          <ModalFooter onBack={goBackToArticle} onContinue={validateShippingInfo} />
        </UiEntity>
        <ModalClose closeModal={closeModal} />
      </UiEntity>
    </UiEntity>
  )
}
