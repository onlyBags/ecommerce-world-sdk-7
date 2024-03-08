import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import config from "../config";
import { PlaceOrderDetails } from "../types";
import { MODAL_SIZE } from "../utils";
import { images } from "../assets/images";
const { baseUrl } = config;

interface ListOfItemsProps {
  placeOrderDetails: PlaceOrderDetails;
  goToShipping: () => void;
  closeModal: () => void;
  removeFromCart: (productId: number) => void;
}

export const ListOfItems = ({
  placeOrderDetails,
  goToShipping,
  closeModal,
  removeFromCart,
}: ListOfItemsProps) => {
  const { lineItems } = placeOrderDetails;
  return (
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <UiEntity
        uiTransform={{
          width: MODAL_SIZE.width,
          height: MODAL_SIZE.height,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <UiEntity
          uiTransform={{
            width: 950,
            height: 600,
            display: "flex",
            flexDirection: "column",
          }}
          uiBackground={{
            color: Color4.lerp(
              Color4.fromHexString("#D0C0B3"),
              Color4.fromHexString("#E3DFDC"),
              0.7
            ),
          }}
        >
          <UiEntity
            uiTransform={{
              width: "100%",
              height: "10%",
              display: "flex",
              flexDirection: "column",
              margin: { top: 10 },
              padding: { left: 10 },
            }}
          >
            <UiEntity
              uiTransform={{ width: "100%", height: "25%" }}
              uiText={{
                value: "Review Your Order",
                fontSize: 14,
                color: Color4.fromHexString("#121417"),
                textAlign: "middle-left",
              }}
            />
            <UiEntity
              uiTransform={{ width: "100%", height: "50%" }}
              uiText={{
                value: "$ All Tax is Estimated",
                fontSize: 8,
                color: Color4.fromHexString("#767676"),
                textAlign: "top-left",
              }}
            />
          </UiEntity>

          <UiEntity
            uiTransform={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            {lineItems.map((lineItem, i) => {
              return (
                <UiEntity
                  key={i}
                  uiTransform={{
                    width: "100%",
                    height: "22%",
                    display: "flex",
                    flexDirection: "column",
                    padding: { left: 10, right: 10 },
                  }}
                >
                  <UiEntity
                    uiTransform={{
                      width: "100%",
                      height: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <UiEntity
                      uiTransform={{ width: "100%", height: "50%" }}
                      uiText={{
                        value: lineItem.name || "Product Name",
                        fontSize: 12,
                        color: Color4.fromHexString("#121417"),
                        textAlign: "middle-center",
                      }}
                    />
                    <UiEntity
                      uiTransform={{ width: "100%", height: "50%" }}
                      uiText={{
                        value: `$ ${lineItem.price}`,
                        fontSize: 16,
                        color: Color4.fromHexString("#121417"),
                        textAlign: "middle-center",
                      }}
                    />
                    <UiEntity
                      uiTransform={{ width: "100%", height: "50%" }}
                      uiText={{
                        value: `${lineItem.quantity}`,
                        fontSize: 12,
                        color: Color4.fromHexString("#121417"),
                        textAlign: "middle-center",
                      }}
                    />
                    <UiEntity
                      uiTransform={{ width: "100%", height: "50%" }}
                      uiBackground={{
                        textureMode: "center",
                        texture: {
                          src: images.cart.trash,
                        },
                      }}
                      onMouseDown={() => {
                        removeFromCart(
                          lineItem.variationId
                            ? lineItem.variationId
                            : lineItem.productId
                        );
                      }}
                    />
                    <UiEntity
                      uiTransform={{
                        width: "80%",
                        height: "80%",
                        margin: { left: 10 },
                      }}
                      uiBackground={{
                        textureMode: "stretch",
                        texture: {
                          src: `${baseUrl}/image?src=${lineItem.image}`,
                        },
                      }}
                    />
                  </UiEntity>
                  <UiEntity
                    uiTransform={{
                      width: "100%",
                      height: "20%",
                      display: "flex",
                    }}
                  >
                    <UiEntity
                      uiTransform={{
                        width: "100%",
                        height: "50%",
                      }}
                      uiBackground={{
                        textureMode: "center",
                        texture: {
                          src: images.cart.line82,
                        },
                      }}
                    />
                  </UiEntity>
                </UiEntity>
              );
            })}
          </UiEntity>
          <UiEntity
            uiBackground={{ color: Color4.fromHexString("#FFFFFF") }}
            uiTransform={{
              width: "100%",
              height: 85,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <UiEntity
              uiTransform={{ width: "100%", height: "100%" }}
              uiText={{
                value: "Cancel",
                fontSize: 24,
                color: Color4.fromHexString("#6F6C90"),
              }}
              onMouseDown={closeModal}
            />
            <UiEntity
              uiTransform={{
                width: 20,
                height: 140,
              }}
              uiBackground={{
                textureMode: "center",
                texture: {
                  src: images.cart.line,
                },
              }}
            />
            <UiEntity
              uiTransform={{ width: "100%", height: "100%" }}
              uiText={{
                value: "Continue",
                fontSize: 24,
                color: Color4.fromHexString("#FF2E55"),
              }}
              onMouseDown={goToShipping}
            />
          </UiEntity>
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: 45,
            height: 45,
            positionType: "absolute",
            position: { left: "925px", top: "-20px" },
          }}
          uiBackground={{
            textureMode: "nine-slices",
            texture: {
              src: images.closeIcon,
            },
            textureSlices: {
              top: 1,
              bottom: 1,
              left: 1,
              right: 1,
            },
          }}
          onMouseDown={closeModal}
        />
      </UiEntity>
    </UiEntity>
  );
};
