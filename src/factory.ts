import { InputAction } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { Quaternion } from "@dcl/sdk/math";

import config from "./config";
import { Slot, Article, WsSlot } from "./types";
import { EcommerceComponents } from "./components";

const { baseUrl } = config;

export const createItem = ({
  slot,
  cb,
  slots,
  datasourceId,
}: {
  slot: Slot;
  cb: (article: Article, datasourceId: number) => void;
  slots: WsSlot[];
  datasourceId: number;
}) => {
  if (!!slot && slot.enabled) {
    const article = slot.article;
    const eComponents = EcommerceComponents.getInstance();
    const engine = eComponents.getEngine();
    const ecs = eComponents.getEcs();
    const {
      Transform,
      MeshRenderer,
      Material,
      MeshCollider,
      PointerEventsSystem,
    } = eComponents.getComponents();
    const itemEntity = engine.addEntity();
    Transform.create(itemEntity, {
      position: Vector3.create(slot.posX, slot.posY, slot.posZ),
      scale: Vector3.create(slot.sizeX, slot.sizeY, slot.sizeZ),
      rotation: Quaternion.fromEulerDegrees(slot.rotX, slot.rotY, slot.rotZ),
    });
    const slotImage = `${baseUrl}/image?src=${
      slot.image || slot.article.images[0].src
    }`;
    Material.setBasicMaterial(itemEntity, {
      texture: Material.Texture.Common({
        src: slotImage,
      }),
    });
    MeshRenderer.setPlane(itemEntity);
    MeshCollider.setPlane(itemEntity);

    ecs.pointerEventsSystem.onPointerDown(
      {
        entity: itemEntity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: `Click to budy ${article.name}`,
        },
      },
      () => cb(article, datasourceId)
    );
    const wsSlot = {
      slotId: slot.id,
      entity: itemEntity,
    };
    slots.push(wsSlot);
  }
};
