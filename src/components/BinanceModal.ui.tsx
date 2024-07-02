import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Input, UiEntity } from "@dcl/sdk/react-ecs";
import { openExternalUrl } from "~system/RestrictedActions";
import { CONTAINER_BASE_PROPS, MODAL_SIZE } from "../utils";
import ModalLeft from "./ModalLeft";
import ModalHeader from "./ModalHeader.ui";
import ModalFormContainer from "./ModalFormContainer.ui";
import ModalFooter from "./ModalFooter.ui";
import ModalClose from "./ModalClose.ui";

interface BinaceModalProps {
  followLink?: string;
  qr: string;
  closeModal: () => void;
}

export const BinanceModal = ({
  followLink,
  closeModal,
  qr,
}: BinaceModalProps) => {
  const handleFollowLink = () => {
    if (followLink) {
      openExternalUrl({ url: followLink });
    }
    closeModal();
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
        <ModalLeft imageSrc={qr} />
        <UiEntity
          uiTransform={{
            width: 530,
            height: 600,
            display: "flex",
            flexDirection: "column",
          }}
          uiBackground={{ color: Color4.fromHexString("#E5E5E5") }}
        >
          <ModalHeader
            title="Binance"
            subtitle="Please proceed to binance to complete your order."
            // onToggleCheckbox={handleToggleCheckbox}
          />
          <UiEntity
            uiTransform={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ModalFormContainer
              children={
                <UiEntity
                  uiTransform={{ ...CONTAINER_BASE_PROPS, width: "100%" }}
                >
                  <UiEntity
                    uiTransform={{ width: "100%", height: "25%" }}
                    uiText={{
                      value: "Scan de QR with your app!",
                      fontSize: 30,
                      color: Color4.Black(),
                    }}
                  />
                  <UiEntity
                    uiTransform={{
                      height: "18%",
                      width: "100%",
                      margin: { bottom: 20 },
                    }}
                    uiText={{
                      value: "Don't have Binance app?",
                      fontSize: 20,
                      color: Color4.Black(),
                    }}
                  />
                  <UiEntity
                    uiTransform={{
                      height: "18%",
                      width: "100%",
                      margin: { bottom: 20 },
                    }}
                    uiText={{
                      value: "No problem, copy or follow the link below!",
                      fontSize: 20,
                      color: Color4.Black(),
                    }}
                  />
                  <Input
                    uiTransform={{
                      maxWidth: "95%",
                      margin: { top: 30, bottom: 30 },
                    }}
                    value={followLink}
                    fontSize={20}
                    color={Color4.Black()}
                    disabled
                  />
                </UiEntity>
              }
            />
          </UiEntity>
          <ModalFooter
            onBack={closeModal}
            onContinue={handleFollowLink}
            backText="Close"
            continueText="Open Link"
          />
        </UiEntity>
        <ModalClose closeModal={closeModal} />
      </UiEntity>
    </UiEntity>
  );
};
