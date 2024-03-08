import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { MODAL_LEFT_SIZE, MODAL_RIGHT_SIZE, MODAL_SIZE, calculateTotal } from '../utils'
import { PlaceOrderDetails } from '../types'
import config from '../config'
const { baseUrl } = config
interface CartModalProps {
  placeOrderDetails: PlaceOrderDetails
  goToCheckout: () => void
  closeModal: () => void
  removeFromCart: (productId: number) => void
}

export const CartModal = ({ placeOrderDetails, goToCheckout, closeModal, removeFromCart }: CartModalProps) => {
  const { lineItems } = placeOrderDetails
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
            width: MODAL_LEFT_SIZE.width,
            height: MODAL_LEFT_SIZE.height,
            display: 'flex',
            flexDirection: 'column'
          }}
          uiBackground={{ color: Color4.lerp(Color4.fromHexString('#D0C0B3'), Color4.fromHexString('#E3DFDC'), 0.7) }}
        >
          <UiEntity
            uiTransform={{
              width: '100%',
              height: '10%',
              display: 'flex',
              flexDirection: 'column',
              margin: { top: 10 },
              padding: { left: 10 }
            }}
          >
            <UiEntity
              uiTransform={{ width: '100%', height: '25%' }}
              uiText={{
                value: 'Review Your Order',
                fontSize: 14,
                color: Color4.fromHexString('#121417'),
                textAlign: 'middle-left'
              }}
            />
            <UiEntity
              uiTransform={{ width: '100%', height: '50%' }}
              uiText={{
                value: '$ All Tax is Estimated',
                fontSize: 8,
                color: Color4.fromHexString('#767676'),
                textAlign: 'top-left'
              }}
            />
          </UiEntity>

          <UiEntity
            uiTransform={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'scroll'
            }}
          >
            {lineItems.map((lineItem, i) => {
              return (
                <UiEntity
                  key={i}
                  uiTransform={{
                    width: '100%',
                    height: '22%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: { left: 10, right: 10 }
                  }}
                >
                  <UiEntity
                    uiTransform={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <UiEntity
                      uiTransform={{ width: '100%', height: '50%' }}
                      uiText={{
                        value: lineItem.name || 'Product Name',
                        fontSize: 12,
                        color: Color4.fromHexString('#121417'),
                        textAlign: 'middle-center'
                      }}
                    />
                    <UiEntity
                      uiTransform={{ width: '100%', height: '50%' }}
                      uiText={{
                        value: `$ ${lineItem.price}`,
                        fontSize: 16,
                        color: Color4.fromHexString('#121417'),
                        textAlign: 'middle-center'
                      }}
                    />
                    <UiEntity
                      uiTransform={{ width: '100%', height: '50%' }}
                      uiText={{
                        value: `${lineItem.quantity}`,
                        fontSize: 12,
                        color: Color4.fromHexString('#121417'),
                        textAlign: 'middle-center'
                      }}
                    />
                    <UiEntity
                      uiTransform={{ width: '100%', height: '50%' }}
                      uiBackground={{
                        textureMode: 'center',
                        texture: {
                          src: 'images/cart/Trash.png'
                        }
                      }}
                      onMouseDown={() => {
                        removeFromCart(lineItem.variationId ? lineItem.variationId : lineItem.productId)
                      }}
                    />
                    <UiEntity
                      uiTransform={{
                        width: '100%',
                        height: '80%',
                        margin: { left: 10 }
                      }}
                      uiBackground={{
                        textureMode: 'stretch',
                        texture: {
                          src: `${baseUrl}/image?src=${lineItem.image}`
                        }
                      }}
                    />
                  </UiEntity>
                  <UiEntity uiTransform={{ width: '100%', height: '20%', display: 'flex', alignItems: 'center' }}>
                    <UiEntity
                      uiTransform={{
                        width: '100%',
                        height: '50%'
                      }}
                      uiBackground={{
                        textureMode: 'center',
                        texture: {
                          src: 'images/cart/Line82.png'
                        }
                      }}
                    />
                  </UiEntity>
                </UiEntity>
              )
            })}
          </UiEntity>
        </UiEntity>

        <UiEntity
          uiTransform={{
            width: MODAL_RIGHT_SIZE.width,
            height: MODAL_RIGHT_SIZE.height,
            display: 'flex',
            flexDirection: 'column'
          }}
          uiBackground={{ color: Color4.fromHexString('#E5E5E5') }}
        >
          <UiEntity
            uiTransform={{
              justifyContent: 'center',
              width: '100%',
              height: 53,
              margin: { left: 20 }
            }}
            uiText={{ value: 'Place Order: ', fontSize: 16, color: Color4.Black(), textAlign: 'middle-left' }}
          />

          <UiEntity
            uiTransform={{
              width: '100%',
              height: '40%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {lineItems.map((lineItem, i) => {
              return (
                <UiEntity
                  uiTransform={{ width: '100%', height: '30%', display: 'flex', padding: { left: 20, right: 20 } }}
                  key={i}
                >
                  <UiEntity
                    uiText={{
                      value: `${lineItem.name}`,
                      textAlign: 'middle-left',
                      fontSize: 10,
                      color: Color4.fromHexString('#121417')
                    }}
                    uiTransform={{ width: '100%', height: '100%' }}
                  />
                  <UiEntity
                    uiText={{
                      value: `${lineItem.quantity} X $ ${lineItem.price}`,
                      textAlign: 'middle-right',
                      fontSize: 10,
                      color: Color4.fromHexString('#121417')
                    }}
                    uiTransform={{ width: '100%', height: '100%' }}
                  />
                </UiEntity>
              )
            })}

            <UiEntity
              uiBackground={{
                textureMode: 'center',
                texture: {
                  src: 'images/cart/Line82.png'
                }
              }}
              uiTransform={{ width: '100%', height: '10%' }}
            />
          </UiEntity>
          <UiEntity uiTransform={{ width: '100%', height: '25%', display: 'flex', flexDirection: 'column' }}>
            <UiEntity uiTransform={{ width: '100%', height: '25%', display: 'flex', padding: { left: 20, right: 20 } }}>
              <UiEntity
                uiText={{
                  value: 'Subtotal',
                  textAlign: 'middle-left',
                  fontSize: 10,
                  color: Color4.fromHexString('#505050')
                }}
                uiTransform={{ width: '100%', height: '100%' }}
              />
              <UiEntity
                uiText={{
                  value: `$ ${calculateTotal(lineItems)}`,
                  textAlign: 'middle-right',
                  fontSize: 10,
                  color: Color4.fromHexString('#121417')
                }}
                uiTransform={{ width: '100%', height: '100%' }}
              />
            </UiEntity>
            <UiEntity uiTransform={{ width: '100%', height: '25%', display: 'flex', padding: { left: 20, right: 20 } }}>
              <UiEntity
                uiText={{
                  value: 'Shipping',
                  textAlign: 'middle-left',
                  fontSize: 10,
                  color: Color4.fromHexString('#121417')
                }}
                uiTransform={{ width: '100%', height: '100%' }}
              />
              <UiEntity
                uiText={{ value: '$40', textAlign: 'middle-right', color: Color4.fromHexString('#121417') }}
                uiTransform={{ width: '100%', height: '100%' }}
              />
            </UiEntity>
          </UiEntity>
          <UiEntity uiTransform={{ width: '100%', height: '25%', margin: { right: 20 } }}>
            <UiEntity
              uiBackground={{
                color: Color4.lerp(Color4.fromHexString('#F3316E'), Color4.fromHexString('#C93FC6'), 0.3)
              }}
              uiTransform={{ width: '100%', height: 60, display: 'flex', margin: { left: 20, right: 20 } }}
            >
              <UiEntity
                uiTransform={{ width: '100%', height: '100%' }}
                uiText={{ value: 'Order Total', fontSize: 14, color: Color4.White() }}
              />
              <UiEntity
                uiTransform={{ width: '100%', height: '100%' }}
                uiText={{ value: `$ ${calculateTotal(lineItems)}`, fontSize: 14, color: Color4.White() }}
              />
            </UiEntity>
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: '100%',
              height: '25%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <UiEntity
              uiTransform={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}
            >
              <UiEntity
                uiBackground={{ color: Color4.fromHexString('#FFFFFF') }}
                uiTransform={{
                  width: '100%',
                  height: 65,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <UiEntity
                  uiTransform={{ width: '100%', height: '100%' }}
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
                  uiTransform={{ width: '100%', height: '100%' }}
                  uiText={{
                    value: 'Continue',
                    fontSize: 24,
                    color: Color4.fromHexString('#FF2E55')
                  }}
                  onMouseDown={goToCheckout}
                />
              </UiEntity>
            </UiEntity>
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
