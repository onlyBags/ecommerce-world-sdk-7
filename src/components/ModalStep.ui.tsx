import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { images } from "../assets/images";

const baseImgPath = "images/contact";
const ModalStep = ({ step }: { step: number }) => {
  const getStepImage = () => {
    switch (step) {
      case 1:
        return images.steps.firstStep;
      case 2:
        return images.steps.secondStep;
      case 3:
        return images.steps.finalStep;
      default:
        return images.steps.firstStep;
        break;
    }
  };

  return (
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
            src: getStepImage(),
          },
        }}
      />
    </UiEntity>
  );
};

export default ModalStep;
