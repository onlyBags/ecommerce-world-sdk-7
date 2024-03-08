import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Input, Label, UiEntity } from "@dcl/sdk/react-ecs";
import { Billing, PlaceOrderDetails, Shipping } from "../types";
import ModalStep from "./ModalStep.ui";
import ModalFooter from "./ModalFooter.ui";
import ModalHeader from "./ModalHeader.ui";
import ModalClose from "./ModalClose.ui";
import ModalLeft from "./ModalLeft";
import {
  CONTAINER_BASE_PROPS,
  INPUT_FONT_SIZE,
  INPUT_TRANSFORM,
  LABEL_FONT_SIZE,
  LABEL_TRANSFORM,
  MODAL_RIGHT_SIZE,
  MODAL_SIZE,
} from "../utils";
import ModalFormContainer from "./ModalFormContainer.ui";
import { images } from "../assets/images";
// import { postOrder } from '../utils'

interface ReviewInfoProps {
  placeOrderDetails: PlaceOrderDetails;
  closeModal: () => void;
  goBackToBilling: () => void;
  goToCartModal: () => void;
}
const billingFields: {
  key: keyof Billing;
  label: string;
  required: boolean;
}[] = [
  {
    key: "address1",
    label: "Address 1",
    required: true,
  },
  {
    key: "address2",
    label: "Address 2",
    required: false,
  },
  {
    key: "city",
    label: "City",
    required: true,
  },
  {
    key: "state",
    label: "State*",
    required: true,
  },
  {
    key: "postcode",
    label: "Postcode",
    required: true,
  },
  {
    key: "country",
    label: "Country",
    required: true,
  },
];

const shippingFields: {
  key: keyof Shipping;
  label: string;
}[] = [
  {
    key: "address1",
    label: "Address 1",
  },
  {
    key: "address2",
    label: "Address 2",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "state",
    label: "Stat",
  },
  {
    key: "postcode",
    label: "Postcode",
  },
  {
    key: "country",
    label: "Country",
  },
];

export const ReviewInfo = ({
  goBackToBilling,
  placeOrderDetails,
  closeModal,
  goToCartModal,
}: ReviewInfoProps) => {
  return (
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UiEntity
        uiTransform={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: MODAL_SIZE.width,
          height: MODAL_SIZE.height,
        }}
      >
        <ModalLeft imageSrc={images.contact.contact} />
        <UiEntity
          uiTransform={{
            width: MODAL_RIGHT_SIZE.width,
            height: MODAL_RIGHT_SIZE.height,
            flexDirection: "column",
          }}
          uiBackground={{ color: Color4.fromHexString("#E5E5E5") }}
        >
          <ModalStep step={3} />
          <ModalHeader title="Review Info" />
          <UiEntity
            uiTransform={{
              width: MODAL_RIGHT_SIZE.width,
              height: MODAL_RIGHT_SIZE.height,
              flexDirection: "row",
            }}
          >
            <UiEntity
              uiTransform={{
                height: "100%",
                width: "50%",
                flexDirection: "column",
              }}
            >
              <UiEntity
                uiTransform={{
                  height: 30,
                  width: "100%",
                  flexDirection: "column",
                  margin: {
                    left: 20,
                  },
                }}
                uiText={{
                  value: "Shipping Info",
                  fontSize: 20,
                  textAlign: "top-left",
                  color: Color4.Black(),
                }}
              />
              <ModalFormContainer
                children={shippingFields.map((field) => {
                  return (
                    <UiEntity
                      uiTransform={{
                        ...CONTAINER_BASE_PROPS,
                        width: 220,
                      }}
                      key={field.key}
                    >
                      <Label
                        value={field.label}
                        fontSize={LABEL_FONT_SIZE}
                        textAlign="top-left"
                        color={Color4.Black()}
                        uiTransform={LABEL_TRANSFORM}
                      />

                      <Input
                        value={placeOrderDetails.shipping[field.key]}
                        onChange={(e: string) => {
                          placeOrderDetails.shipping[field.key] = e;
                        }}
                        uiTransform={INPUT_TRANSFORM}
                        fontSize={INPUT_FONT_SIZE}
                        color={Color4.Black()}
                        disabled={true}
                      />
                    </UiEntity>
                  );
                })}
              />
            </UiEntity>
            <UiEntity
              uiTransform={{
                height: "100%",
                width: "50%",
                flexDirection: "column",
              }}
            >
              <UiEntity
                uiTransform={{
                  height: 30,
                  width: "100%",
                  flexDirection: "column",
                  margin: {
                    left: 20,
                  },
                }}
                uiText={{
                  value: "Billing Info",
                  fontSize: 20,
                  textAlign: "top-left",
                  color: Color4.Black(),
                }}
              />
              <ModalFormContainer
                children={billingFields.map((field) => {
                  return (
                    <UiEntity
                      uiTransform={{
                        ...CONTAINER_BASE_PROPS,
                        width: 220,
                      }}
                      key={field.key}
                    >
                      <Label
                        value={field.label}
                        fontSize={LABEL_FONT_SIZE}
                        textAlign="top-left"
                        color={Color4.Black()}
                        uiTransform={LABEL_TRANSFORM}
                      />

                      <Input
                        value={placeOrderDetails.billing[field.key]}
                        onChange={(e: string) => {
                          placeOrderDetails.billing[field.key] = e;
                        }}
                        uiTransform={INPUT_TRANSFORM}
                        fontSize={INPUT_FONT_SIZE}
                        color={Color4.Black()}
                        disabled={true}
                      />
                    </UiEntity>
                  );
                })}
              />
            </UiEntity>
          </UiEntity>
          <ModalFooter onBack={goBackToBilling} onContinue={goToCartModal} />
        </UiEntity>
        <ModalClose closeModal={closeModal} />
      </UiEntity>
    </UiEntity>
  );
};
