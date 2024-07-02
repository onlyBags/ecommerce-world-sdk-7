import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { images } from "../assets/images";

const ModalFooter = ({
  onBack,
  onContinue,
  backText,
  continueText,
}: {
  onBack: () => void;
  onContinue: () => void;
  backText?: string;
  continueText?: string;
}) => {
  return (
    <UiEntity
      uiTransform={{
        width: 530,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: { top: 0 },
      }}
      uiBackground={{ color: Color4.White() }}
    >
      <UiEntity
        uiTransform={{ width: 300, height: 100 }}
        uiText={{
          value: backText || "Back",
          fontSize: 24,
          color: Color4.fromHexString("#6F6C90"),
        }}
        onMouseDown={onBack}
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
          value: continueText || "Continue",
          fontSize: 24,
          color: Color4.fromHexString("#FF2E55"),
        }}
        onMouseDown={onContinue}
      />
    </UiEntity>
  );
};

export default ModalFooter;
