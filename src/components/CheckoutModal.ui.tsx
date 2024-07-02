import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { MODAL_SIZE, postOrder } from "../utils";
import { PlaceOrderDetails } from "../types";
import { executeTask } from "@dcl/sdk/ecs";
import { images } from "../assets/images";
import { getUserData } from "~system/UserIdentity";
interface CheckoutModalProps {
  datasourceId: number;
  placeOrderDetails: PlaceOrderDetails;
  closeModal: () => void;
}

function selectOption(index: number) {
  console.log(index);
}

type PaymentMethod = "BAG" | "BINANCE" | "COINBASE";

let selectedPayment: PaymentMethod;
let isPaying: boolean = false;
let hasSelectedPayment: boolean = true;

export const CheckoutModal = ({
  datasourceId,
  placeOrderDetails,
  closeModal,
}: CheckoutModalProps) => {
  const handlePayment = async (paymentMethod: PaymentMethod) => {
    selectedPayment = paymentMethod;
    if (!selectedPayment) {
      hasSelectedPayment = false;
      return;
    }
    placeOrderDetails.paymentMethod = paymentMethod;
    try {
      const userData = await getUserData({});
      isPaying = true;
      hasSelectedPayment = true;
      placeOrderDetails.shipping.firstName =
        userData.data?.displayName || "guest";
      placeOrderDetails.shipping.lastName = "onlybags";
      placeOrderDetails.billing.firstName =
        userData.data?.displayName || "guest";
      placeOrderDetails.billing.lastName = "onlybags";
      const res = await postOrder(datasourceId, placeOrderDetails);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      isPaying = false;
    }
  };

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
            width: 419,
            height: 580,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              width: 386,
              height: 402,
            }}
            uiBackground={{
              textureMode: "center",
              texture: {
                src: images.payments.payment,
              },
            }}
          />
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: 530,
            height: 580,
            display: "flex",
            flexDirection: "column",
          }}
          uiBackground={{ color: Color4.fromHexString("#E5E5E5") }}
        >
          <UiEntity
            uiTransform={{
              justifyContent: "center",
              margin: { top: 35 },
            }}
          >
            <UiEntity
              uiTransform={{
                width: 425,
                height: 53,
                justifyContent: "center",
              }}
              uiBackground={{
                textureMode: "center",
                texture: {
                  src: images.steps.finalStep,
                },
              }}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{ margin: { top: 25, left: 20 } }}
            uiText={{
              value: "Select Payment Method",
              fontSize: 24,
              textAlign: "top-left",
              color: Color4.fromHexString("#121417"),
            }}
          />
          <UiEntity
            uiTransform={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: { left: 10, right: 10 },
            }}
          >
            <UiEntity uiTransform={{ width: "100%", height: "30%" }}>
              <UiEntity
                uiBackground={{
                  color:
                    selectedPayment === "BAG"
                      ? Color4.Black()
                      : Color4.fromHexString("#E5E5E5"),
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300,
                  }}
                  uiBackground={{
                    textureMode: "center",
                    texture: {
                      src: images.payments.bag,
                    },
                  }}
                  onMouseDown={() => (selectedPayment = "BAG")}
                />
              </UiEntity>
              <UiEntity
                uiBackground={{
                  color:
                    selectedPayment === "COINBASE"
                      ? Color4.Black()
                      : Color4.fromHexString("#E5E5E5"),
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300,
                  }}
                  uiBackground={{
                    textureMode: "center",
                    texture: {
                      src: images.payments.coinbase,
                    },
                  }}
                  onMouseDown={() => (selectedPayment = "COINBASE")}
                />
              </UiEntity>
              <UiEntity
                uiBackground={{
                  color:
                    selectedPayment === "BINANCE"
                      ? Color4.Black()
                      : Color4.fromHexString("#E5E5E5"),
                }}
                uiTransform={{ width: 250 }}
              >
                <UiEntity
                  uiTransform={{
                    width: 300,
                  }}
                  uiBackground={{
                    textureMode: "center",
                    texture: {
                      src: images.payments.binance,
                    },
                  }}
                  onMouseDown={() => (selectedPayment = "BINANCE")}
                />
              </UiEntity>
            </UiEntity>
            {!hasSelectedPayment && (
              <UiEntity
                uiTransform={{ margin: { top: 25, left: 20 } }}
                uiText={{
                  value: "You have to select a payment method",
                  fontSize: 20,
                  textAlign: "top-left",
                  color: Color4.Red(),
                }}
              />
            )}
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: 530,
              height: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            uiBackground={{ color: Color4.White() }}
          >
            <UiEntity
              uiTransform={{ width: 300, height: 100 }}
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
                  src: images.payments.line,
                },
              }}
            />
            <UiEntity
              uiTransform={{ width: 300, height: 100 }}
              uiText={{
                value: "Place Order",
                fontSize: 24,
                color:
                  !isPaying && selectedPayment
                    ? Color4.fromHexString("#FF2E55")
                    : Color4.Gray(),
              }}
              onMouseDown={
                isPaying ? () => {} : () => handlePayment(selectedPayment)
              }
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
