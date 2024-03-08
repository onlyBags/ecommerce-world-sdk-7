import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { MODAL_SIZE, postOrder } from '../utils'
import { PlaceOrderDetails } from '../types'
import { executeTask } from '@dcl/sdk/ecs'

interface CheckoutModalProps {
  placeOrderDetails: PlaceOrderDetails
  closeModal: () => void
}

function selectOption(index: number) {
  console.log(index)
}

enum PaymentMethod {
  Ice = 'Ice',
  Coinbase = 'Coinbase',
  Binance = 'Binance',
  CreditCard = 'CreditCard'
}
let selectedPayment: PaymentMethod
let isPaying: boolean = false
let hasSelectedPayment: boolean = true

export const CheckoutModal = ({ placeOrderDetails, closeModal }: CheckoutModalProps) => {
  const handlePayment = (paymentMethod: PaymentMethod) => {
    selectedPayment = paymentMethod
    if (!selectedPayment) {
      hasSelectedPayment = false
      return
    }
    placeOrderDetails.paymentMethod = paymentMethod

    executeTask(async () => {
      try {
        isPaying = true
        hasSelectedPayment = true
        const res = await postOrder(placeOrderDetails)
        console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
        isPaying = false
      }
    })
  }

  return (
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <UiEntity
        uiTransform={{
          width: MODAL_SIZE.width,
          height: MODAL_SIZE.height,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <UiEntity
          uiTransform={{
            width: 419,
            height: 580,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          uiBackground={{ color: Color4.lerp(Color4.fromHexString('#D0C0B3'), Color4.fromHexString('#E3DFDC'), 0.7) }}
        >
          <UiEntity
            uiTransform={{
              width: 386,
              height: 402
            }}
            uiBackground={{
              textureMode: 'center',
              texture: {
                src: 'images/payments/Payment.png'
              }
            }}
          />
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: 530,
            height: 580,
            display: 'flex',
            flexDirection: 'column'
          }}
          uiBackground={{ color: Color4.fromHexString('#E5E5E5') }}
        >
          <UiEntity
            uiTransform={{
              justifyContent: 'center',
              margin: { top: 35 }
            }}
          >
            <UiEntity
              uiTransform={{
                width: 425,
                height: 53,
                justifyContent: 'center'
              }}
              uiBackground={{
                textureMode: 'center',
                texture: {
                  src: 'images/payments/Final-Step.png'
                }
              }}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{ margin: { top: 25, left: 20 } }}
            uiText={{
              value: 'Select Payment Method',
              fontSize: 24,
              textAlign: 'top-left',
              color: Color4.fromHexString('#121417')
            }}
          />
          <UiEntity
            uiTransform={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: { left: 10, right: 10 }
            }}
          >
            <UiEntity uiTransform={{ width: '100%', height: '30%' }}>
              <UiEntity
                uiBackground={{
                  color: selectedPayment === PaymentMethod.Ice ? Color4.Black() : Color4.fromHexString('#E5E5E5')
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300
                  }}
                  uiBackground={{
                    textureMode: 'center',
                    texture: {
                      src: 'images/payments/Ice2.png'
                    }
                  }}
                  onMouseDown={() => (selectedPayment = PaymentMethod.Ice)}
                />
              </UiEntity>
              <UiEntity
                uiBackground={{
                  color: selectedPayment === PaymentMethod.Coinbase ? Color4.Black() : Color4.fromHexString('#E5E5E5')
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300
                  }}
                  uiBackground={{
                    textureMode: 'center',
                    texture: {
                      src: 'images/payments/Coinbase2.png'
                    }
                  }}
                  onMouseDown={() => (selectedPayment = PaymentMethod.Coinbase)}
                />
              </UiEntity>
              <UiEntity
                uiBackground={{
                  color: selectedPayment === PaymentMethod.Binance ? Color4.Black() : Color4.fromHexString('#E5E5E5')
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300
                  }}
                  uiBackground={{
                    textureMode: 'center',
                    texture: {
                      src: 'images/payments/Binance2.png'
                    }
                  }}
                  onMouseDown={() => (selectedPayment = PaymentMethod.Binance)}
                />
              </UiEntity>
              <UiEntity
                uiBackground={{
                  color: selectedPayment === PaymentMethod.CreditCard ? Color4.Black() : Color4.fromHexString('#E5E5E5')
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300
                  }}
                  uiBackground={{
                    textureMode: 'center',
                    texture: {
                      src: 'images/payments/Credit-Card.png'
                    }
                  }}
                  onMouseDown={() => (selectedPayment = PaymentMethod.CreditCard)}
                />
              </UiEntity>
            </UiEntity>
            {!hasSelectedPayment && (
              <UiEntity
                uiTransform={{ margin: { top: 25, left: 20 } }}
                uiText={{
                  value: 'You have to select a payment method',
                  fontSize: 20,
                  textAlign: 'top-left',
                  color: Color4.Red()
                }}
              />
            )}
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: 530,
              height: 90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            uiBackground={{ color: Color4.White() }}
          >
            <UiEntity
              uiTransform={{ width: 300, height: 100 }}
              uiText={{
                value: 'Cancel',
                fontSize: 24,
                color: Color4.fromHexString('#6F6C90')
              }}
              onMouseDown={closeModal}
            />
            <UiEntity
              uiTransform={{
                width: 20,
                height: 140
              }}
              uiBackground={{
                textureMode: 'center',
                texture: {
                  src: 'images/payments/Line.png'
                }
              }}
            />
            <UiEntity
              uiTransform={{ width: 300, height: 100 }}
              uiText={{
                value: 'Place Order',
                fontSize: 24,
                color: !isPaying && selectedPayment ? Color4.fromHexString('#FF2E55') : Color4.Gray()
              }}
              onMouseDown={isPaying ? () => {} : () => handlePayment(selectedPayment)}
            />
          </UiEntity>
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: 45,
            height: 45,
            positionType: 'absolute',
            position: { left: '925px', top: '-20px' }
          }}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: {
              src: 'images/Close.png'
            },
            textureSlices: {
              top: 1,
              bottom: 1,
              left: 1,
              right: 1
            }
          }}
          onMouseDown={closeModal}
        />
      </UiEntity>
    </UiEntity>
  )
}
