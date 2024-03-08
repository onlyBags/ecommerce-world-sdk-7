import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Button, UiEntity } from "@dcl/sdk/react-ecs";
import { images } from "../assets/images";

interface SuccessModalProps {
  btnHandler: () => void;
  message?: string;
  buttonText?: string;
}

export const SuccessModal = ({
  btnHandler,
  message,
  buttonText = "ok",
}: SuccessModalProps) => {
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
          width: 470,
          height: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        uiBackground={{ color: Color4.fromHexString("#E5E5E5") }}
      >
        <UiEntity
          uiBackground={{
            textureMode: "stretch",
            texture: {
              src: images.success.successIcon,
            },
          }}
          uiTransform={{ width: 50, height: 50, margin: { top: 30 } }}
        ></UiEntity>
        <UiEntity
          uiTransform={{ width: "100%", height: "20%" }}
          uiText={{ value: "Success!", fontSize: 20, color: Color4.Black() }}
        />
        <UiEntity
          uiTransform={{ width: "100%", height: "15%", margin: { bottom: 20 } }}
          uiText={{
            value: message || "Ok",
            fontSize: 16,
            color: Color4.Black(),
          }}
        />

        <Button
          uiBackground={{ color: Color4.fromHexString("#00CC00") }}
          uiTransform={{ width: "50%", height: "15%" }}
          value={buttonText}
          fontSize={16}
          onMouseDown={btnHandler}
        />
      </UiEntity>
    </UiEntity>
  );
};
