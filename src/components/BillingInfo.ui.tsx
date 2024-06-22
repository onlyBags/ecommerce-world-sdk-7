import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Input, Label, UiEntity, Dropdown } from "@dcl/sdk/react-ecs";
import { Billing, PlaceOrderDetails, UserData } from "../types";
import ModalFooter from "./ModalFooter.ui";
import ModalHeader from "./ModalHeader.ui";
import ModalFormContainer from "./ModalFormContainer.ui";
import ModalLeft from "./ModalLeft";
import ModalStep from "./ModalStep.ui";
import {
  CONTAINER_BASE_PROPS,
  FORM_FIELDS_PROPS,
  INPUT_FONT_SIZE,
  INPUT_TRANSFORM,
  LABEL_FONT_SIZE,
  LABEL_TRANSFORM,
  MODAL_SIZE,
} from "../utils";
import ModalClose from "./ModalClose.ui";
import { images } from "../assets/images";
interface BillingInfoProps {
  closeModal: () => void;
  placeOrderDetails: PlaceOrderDetails;
  goToReviewInfo: () => void;
  goBackToShipping: () => void;
  userData: UserData;
}

const fields: {
  key: keyof Billing;
  label: string;
  required: boolean;
}[] = [
  {
    key: "address1",
    label: "Address 1 *",
    required: true,
  },
  {
    key: "address2",
    label: "Address 2",
    required: false,
  },
  {
    key: "city",
    label: "City *",
    required: true,
  },
  {
    key: "state",
    label: "State*",
    required: true,
  },
  {
    key: "postcode",
    label: "Postcode *",
    required: true,
  },
  {
    key: "country",
    label: "Country *",
    required: true,
  },
];
let hasErrors = false;
let hasUserData = false;
let hasSaveData = false;
let hasSameShippingAddress = false;
let selectedAddressIndex = 0;

export const BillingInfo = ({
  closeModal,
  placeOrderDetails,
  goToReviewInfo,
  goBackToShipping,
  userData,
}: BillingInfoProps) => {
  const validateBillingInfo = () => {
    hasErrors = false;
    const { address1, city, state, country, postcode } =
      placeOrderDetails.billing;
    if (!address1 || !city || !state || !country || !postcode) {
      hasErrors = true;
    } else {
      goToReviewInfo();
    }
  };
  const handleToggleShippingAddress = () => {
    hasSameShippingAddress = !hasSameShippingAddress;
    hasUserData = false;

    if (hasSameShippingAddress) {
      placeOrderDetails.billing = { ...placeOrderDetails.shipping };
    } else {
      placeOrderDetails.billing = {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
      };
    }
  };

  const setDefaultBilling = (address: any) => {
    const billingFields: (keyof Billing)[] = [
      "firstName",
      "lastName",
      "address1",
      "address2",
      "city",
      "state",
      "postcode",
      "country",
    ];

    billingFields.forEach((field) => {
      placeOrderDetails.billing[field] = address[field];
    });
  };
  const handleDropdownChange = (e: number) => {
    selectedAddressIndex = e;
    let selectedAddress = userData?.billingAddress[selectedAddressIndex];
    setDefaultBilling(selectedAddress);
  };

  const handleHasAddressClick = () => {
    hasUserData = !hasUserData;
    hasSaveData = false;
    hasSameShippingAddress = false;

    if (hasUserData) {
      let selectedAddress = userData?.billingAddress[selectedAddressIndex];
      setDefaultBilling(selectedAddress);
    } else {
      const shippingFields: (keyof Billing)[] = [
        "firstName",
        "lastName",
        "address1",
        "address2",
        "city",
        "state",
        "postcode",
        "country",
      ];

      shippingFields.forEach((field) => {
        placeOrderDetails.billing[field] = "";
      });
    }
  };

  const handleCheckboxSaveClick = () => {
    hasSaveData = !hasSaveData;
    placeOrderDetails.saveBilling = hasSaveData;
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
        <ModalLeft imageSrc={images.contact.contact} />
        <UiEntity
          uiTransform={{
            width: 530,
            height: 600,
            display: "flex",
            flexDirection: "column",
          }}
          uiBackground={{ color: Color4.fromHexString("#E5E5E5") }}
        >
          <ModalStep step={2} />
          <ModalHeader
            title="Billing Info"
            subtitle="Please fill your information so we can get in touch with you."
            // onToggleCheckbox={handleToggleCheckbox}
          />
          <UiEntity
            uiTransform={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <ModalFormContainer
              children={
                <UiEntity uiTransform={CONTAINER_BASE_PROPS}>
                  {fields.map((field) => {
                    return (
                      <UiEntity key={field.key} uiTransform={FORM_FIELDS_PROPS}>
                        <Label
                          value={field.label}
                          fontSize={LABEL_FONT_SIZE}
                          textAlign="top-left"
                          color={
                            hasErrors &&
                            field.required &&
                            !placeOrderDetails.billing[field.key]
                              ? Color4.Red()
                              : Color4.Black()
                          }
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
                        />
                      </UiEntity>
                    );
                  })}
                </UiEntity>
              }
            />
            <UiEntity
              uiTransform={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
                alignItems: "center",
                padding: { top: 15 },
              }}
            >
              {userData?.billingAddress.length > 0 &&
                !hasSaveData &&
                !hasSameShippingAddress && (
                  <UiEntity
                    uiTransform={{
                      display: "flex",
                      width: "80%",
                    }}
                  >
                    <UiEntity
                      onMouseDown={handleHasAddressClick}
                      uiTransform={{
                        width: 15,
                        height: 30,
                      }}
                      uiBackground={{
                        textureMode: "center",
                        texture: {
                          src: hasUserData
                            ? images.contact.checkboxFilled
                            : images.contact.checkboxEmpty,
                        },
                      }}
                    />
                    <UiEntity
                      onMouseDown={handleHasAddressClick}
                      uiTransform={{ width: 80, height: 30 }}
                      uiText={{
                        value: "My address",
                        color: Color4.fromHexString("#1C1C1C"),
                        fontSize: 12,
                      }}
                    />
                  </UiEntity>
                )}
              {hasUserData && userData?.billingAddress.length > 0 && (
                <UiEntity
                  uiTransform={{
                    width: "80%",
                    height: "100%",
                  }}
                >
                  <Dropdown
                    options={userData?.billingAddress.map(
                      (address) => `${address.id}-${address.address1}`
                    )}
                    onChange={handleDropdownChange}
                    uiTransform={{
                      width: "100%",
                      height: "40px",
                    }}
                  />
                </UiEntity>
              )}
              {!hasUserData && (
                <UiEntity uiTransform={{ display: "flex", width: "80%" }}>
                  <UiEntity
                    onMouseDown={handleCheckboxSaveClick}
                    uiTransform={{
                      width: 15,
                      height: 30,
                    }}
                    uiBackground={{
                      textureMode: "center",
                      texture: {
                        src: hasSaveData
                          ? images.contact.checkboxFilled
                          : images.contact.checkboxEmpty,
                      },
                    }}
                  />
                  <UiEntity
                    onMouseDown={handleCheckboxSaveClick}
                    uiTransform={{ width: 80, height: 30 }}
                    uiText={{
                      value: "Save data",
                      color: Color4.fromHexString("#1C1C1C"),
                      fontSize: 12,
                    }}
                  />
                </UiEntity>
              )}
              {!hasUserData && (
                <UiEntity uiTransform={{ display: "flex", width: "80%" }}>
                  <UiEntity
                    onMouseDown={handleToggleShippingAddress}
                    uiTransform={{
                      width: 15,
                      height: 30,
                    }}
                    uiBackground={{
                      textureMode: "center",
                      texture: {
                        src: hasSameShippingAddress
                          ? images.contact.checkboxFilled
                          : images.contact.checkboxEmpty,
                      },
                    }}
                  />
                  <UiEntity
                    onMouseDown={handleToggleShippingAddress}
                    uiTransform={{ width: 180, height: 30 }}
                    uiText={{
                      value: "Same shipping address",
                      color: Color4.fromHexString("#1C1C1C"),
                      fontSize: 12,
                    }}
                  />
                </UiEntity>
              )}
            </UiEntity>
          </UiEntity>
          <ModalFooter
            onBack={goBackToShipping}
            onContinue={validateBillingInfo}
          />
        </UiEntity>
        <ModalClose closeModal={closeModal} />
      </UiEntity>
    </UiEntity>
  );
};
