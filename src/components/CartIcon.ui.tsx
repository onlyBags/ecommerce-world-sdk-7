import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs";
import { LineItem } from "../types";
interface CartIconProps {
  lineItems: LineItem[];
  closeModal: () => void;
  totalQuantityProduct: number;
}
export const CartIcon = ({
  closeModal,
  lineItems,
  totalQuantityProduct,
}: CartIconProps) => {
  totalQuantityProduct = lineItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <UiEntity
      uiTransform={{
        width: 60,
        height: 60,
        positionType: "absolute",
        position: { right: "90px", top: "13px" },
      }}
      onMouseDown={closeModal}
    >
      <UiEntity
        uiTransform={{
          width: 60,
          height: 60,
        }}
        uiBackground={{
          textureMode: "nine-slices",
          texture: {
            src: "../images/1.png",
          },
          textureSlices: {
            top: 0.5,
            bottom: 0.5,
            left: 0.5,
            right: 0.5,
          },
        }}
      />
      <Label
        value={totalQuantityProduct.toString()}
        fontSize={26}
        uiTransform={{
          width: "100px",
          height: "40px",
          positionType: "absolute",
          position: { right: "-50px", top: "26px" },
        }}
      />
    </UiEntity>
  );
};
