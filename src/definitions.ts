import {
  MaterialComponentDefinitionExtended,
  TransformComponentExtended,
  LastWriteWinElementSetComponentDefinition,
  PBUiTransform,
  PBUiText,
  PBUiBackground,
  MeshRendererComponentDefinitionExtended,
  GltfContainer,
  MeshCollider,
  PointerEvents,
} from "@dcl/sdk/ecs";

export type EngineComponents = {
  Transform: TransformComponentExtended;
  Material: MaterialComponentDefinitionExtended;
  UiTransform: LastWriteWinElementSetComponentDefinition<PBUiTransform>;
  UiText: LastWriteWinElementSetComponentDefinition<PBUiText>;
  UiBackground: LastWriteWinElementSetComponentDefinition<PBUiBackground>;
  MeshRenderer: MeshRendererComponentDefinitionExtended;
  GltfContainer: typeof GltfContainer;
  MeshCollider: typeof MeshCollider;
  PointerEventsSystem: typeof PointerEvents;
};
