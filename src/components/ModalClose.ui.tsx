import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { images } from "../assets/images";

const ModalClose = ({ closeModal }: { closeModal: () => void }) => {
  return (
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
  );
};

export default ModalClose;
