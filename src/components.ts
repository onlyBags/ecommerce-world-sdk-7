import {
  Transform as defineTransform,
  UiTransform as defineUiTransform,
  UiText as defineUiText,
  UiBackground as defineUiBackground,
  Material as defineMaterial,
  MeshRenderer as defineMeshRenderer,
  GltfContainer as defineGltfContainer,
  MeshCollider as defineMeshCollider,
  PointerEvents as definePointerEvents,
} from "@dcl/ecs/dist/components";
import * as ECS from "@dcl/ecs";
// import {
//   pointerEventsSystem as definePointerEventsSystem,
//   PointerEventsSystem as definePointerEventsSystem2,
// } from "@dcl/ecs/dist/runtime/initialization";

import { PointerEventsSystem } from "@dcl/ecs/dist/systems/events";

import { IEngine } from "@dcl/sdk/ecs";
import { EngineComponents } from "./definitions";

export function createComponents(engine: IEngine) {
  return {
    GltfContainer: defineGltfContainer(engine),
    Transform: defineTransform(engine),
    UiTransform: defineUiTransform(engine),
    UiText: defineUiText(engine),
    UiBackground: defineUiBackground(engine),
    Material: defineMaterial(engine),
    MeshRenderer: defineMeshRenderer(engine),
    MeshCollider: defineMeshCollider(engine),
    PointerEventsSystem: definePointerEvents(engine),
  };
}

export class EcommerceComponents {
  private static instance: EcommerceComponents;
  public engine: IEngine;
  public ecs: typeof ECS;
  public components: EngineComponents | null = null;

  public constructor(ecs: typeof ECS) {
    EcommerceComponents.instance = this;
    this.engine = ecs.engine;
    this.ecs = ecs;
    this.setComponents();
  }

  static getInstance() {
    if (!EcommerceComponents.instance) {
      throw new Error("EcommerceComponents not initialized");
    }
    return EcommerceComponents.instance;
  }

  setComponents() {
    this.components = createComponents(this.engine);
  }

  getComponents() {
    if (!this.components)
      throw new Error("EcommerceComponents not initialized");
    return this.components;
  }

  getEngine() {
    if (!this.engine) throw new Error("EcommerceComponents not initialized");
    return this.engine;
  }
  getEcs() {
    if (!this.ecs) throw new Error("EcommerceComponents not initialized");
    return this.ecs;
  }
}
