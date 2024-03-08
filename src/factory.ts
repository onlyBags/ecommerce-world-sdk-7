import { InputAction } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { Quaternion } from "@dcl/sdk/math";

import config from "./config";
import { Article, WsSlot } from "./types";
import { EcommerceComponents } from "./components";

const { baseUrl } = config;

export const createItem = ({
  article,
  cb,
  slots,
}: {
  article: Article;
  cb: (article: Article) => void;
  slots: WsSlot[];
}) => {
  if (article.slot.length && article.slot[0].enabled) {
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
    const slot = article.slot[0];
    Transform.create(itemEntity, {
      position: Vector3.create(slot.posX, slot.posY, slot.posZ),
      scale: Vector3.create(slot.sizeX, slot.sizeY, slot.sizeZ),
      rotation: Quaternion.fromEulerDegrees(slot.rotX, slot.rotY, slot.rotZ),
    });
    const slotImage = `${baseUrl}/image?src=${
      slot.image || article.images[0].src
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
      () => cb(article)
    );
    const wsSlot = {
      slotId: article.slot[0].id,
      entity: itemEntity,
    };
    slots.push(wsSlot);
  }
};
