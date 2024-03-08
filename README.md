# Onlybags-Ecommerce-Sdk

A simple SDK to use with Onlybags ecommerce. This SDK simplifies the integration of the Onlybags e-commerce platform into your projects, allowing for easy setup of storefronts, handling of inventory, and more, with a focus on virtual world applications.

## Install the Library

To get started with the Onlybags Ecommerce SDK, you first need to install the library in your project. Use npm (Node Package Manager) to install it as follows:

```bash
npm i onlybags-ecommerce-sdk
```

```ts
import React from "react";
import * as ecs from "@dcl/sdk/ecs"; // Import the ECS (Entity Component System) from Decentraland SDK
import { connectToEcommerce, OBStoreUI } from "onlybags-ecommerce-sdk"; // Import SDK functions

// Initialize connection to Onlybags Ecommerce with your datasource ID
// Replace '1' with your actual datasource ID created on https://business.dglive.org/
connectToEcommerce(1, ecs);

// Define a UI component that utilizes the OBStoreUI component
const UiComponent = () => (
  <UiEntity>
    {/* Your custom code goes here */}
    <OBStoreUI />
  </UiEntity>
);

export default UiComponent;
```
