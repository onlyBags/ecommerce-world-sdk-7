// import {
//   GltfContainer,
//   MeshRenderer,
//   Schemas,
//   Transform,
//   executeTask,
// } from "@dcl/sdk/ecs";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { ArticleInfo } from "./components/ArticleInfo.ui";
import { CartIcon } from "./components/CartIcon.ui";
import { CheckoutModal } from "./components/CheckoutModal.ui";
import { BillingInfo } from "./components/BillingInfo.ui";
import { ShippingInfo } from "./components/ShippingInfo.ui";
import { CartModal } from "./components/CartModal.ui";
import { ReviewInfo } from "./components/ReviewInfo.ui";
import {
  PlaceOrderDetails,
  type Slot,
  SelectedAttributes,
  WsSlot,
  joystickData,
  UserData,
  Article,
} from "./types";
import { SuccessModal } from "./components/SuccessModal.ui";
import { ErrorModal } from "./components/ErrorModal.ui";
import * as typeEcs from "@dcl/sdk/ecs";
import WebSocketEvents from "./WebSocketEvents";

import { createItem } from "./factory";
import { getVariationData } from "./utils";
import { http } from "./http";
import { getUserWallet } from "./web3/web3Utils";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";

import { web3 } from "./web3/web3";
import { ListOfItems } from "./components/ListOfItems";
import { EcommerceComponents, createComponents } from "./components";
import { EngineComponents } from "./definitions";

let initialized: boolean = false;

let components: EngineComponents;

//MODALS
var isArticleOpen: boolean = false;
var isShippingInfoOpen: boolean = false;
var isBillingInfoOpen: boolean = false;
var isReviewInfoOpen: boolean = false;
var isCartOpen: boolean = false;
var isCheckoutOpen: boolean = false;
var isListOfItemsOpen: boolean = false;

//MODALS MESSAGE
let isInfoModalOpen: boolean = false;
var isErrorModalOpen: boolean = false;

//MESSAGE
let errorMessage: string = "";
let infoMessage: string = "";

//SELECTIONS
let selectedArticle: Article | null = null;
let selectedAttributes: SelectedAttributes = {};
let selectedOptions: Record<string, string> = {};
let articleType: string = "simple";
let slots: WsSlot[] = [];
let userData: UserData;
let totalQuantityProduct: number;
let selectedOptionsArray: Record<string, string>[] = [];
let placeOrderDetails: PlaceOrderDetails = {
  shipping: {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  },
  billing: {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  },
  lineItems: [],
  shippingLines: [],
  wallet: "",
  paymentMethod: "",
  paymentMethodTitle: "",
  saveBilling: false,
  saveShipping: false,
};
//WEBSOCKET
let webSocketEvents: WebSocketEvents;

let infoMessageCb: (isInfoModalOpen: boolean) => void;

const joystickCb = ({
  posX,
  posY,
  posZ,
  rotX,
  rotY,
  rotZ,
  sizeX,
  sizeY,
  sizeZ,
  slotId,
}: joystickData) => {
  if (!components) return;
  const findSlotId = slots.find((slots) => slots.slotId === slotId);
  if (!findSlotId) {
    return;
  }
  const { Transform } = components;
  let mutableTransform = Transform.getMutable(findSlotId.entity);
  mutableTransform.position = Vector3.create(posX, posY, posZ);
  mutableTransform.rotation = Quaternion.fromEulerDegrees(rotX, rotY, rotZ);
  mutableTransform.scale = Vector3.create(sizeX, sizeY, sizeZ);
};

export const connectToEcommerce = async (datasourceId: number, ecs: any) => {
  if (initialized) return;
  initialized = true;
  try {
    new EcommerceComponents(ecs);
    await getStoreData(datasourceId);
  } catch (error) {
    console.error(`Error initializing Ecommerce: ${(error as Error).message}`);
  }
};

const getStoreData = async (datasourceId: number) => {
  try {
    const wallet = await getUserWallet();
    if (wallet) {
      webSocketEvents = new WebSocketEvents(
        datasourceId,
        wallet,
        infoModal,
        joystickCb
      );
      const data = await web3.getUserData(wallet);
      userData = data.data;
    }
    const res = await http.get<Slot[]>(`catalog/slots/${datasourceId}`);
    if (res.status === 200) {
      if (res.data.length) {
        res.data.forEach((slot) => {
          createItem({ slot, cb: goToArticleDetail, slots });
        });
      }
    }
  } catch {
    console.log("failed to reach URL");
  }
};

export const OBStoreUI = (): ReactEcs.JSX.Element => (
  <UiEntity uiTransform={{ width: "100%" }}>
    {isArticleOpen && selectedArticle && (
      <ArticleInfo
        selectedArticle={selectedArticle}
        selectedAttributes={selectedAttributes}
        articleType={articleType}
        goToShipping={goToShipping}
        placeOrderDetails={placeOrderDetails}
        closeModal={closeArticleModal}
        addToCartIcon={addToCartIcon}
      />
    )}
    {/*BUY NOaddToCartIcon -> SHIPPING INFO*/}
    {isShippingInfoOpen && placeOrderDetails.lineItems.length > 0 && (
      <ShippingInfo
        goToBillingInfo={goToBillingInfo}
        goBackToArticle={goBackToArticle}
        placeOrderDetails={placeOrderDetails}
        userData={userData}
        closeModal={closeShippingModal}
      />
    )}
    {/* BILLING INFO */}
    {isBillingInfoOpen && (
      <BillingInfo
        goToReviewInfo={goToReviewInfo}
        goBackToShipping={goBackToShipping}
        placeOrderDetails={placeOrderDetails}
        userData={userData}
        closeModal={closeBillingModal}
      />
    )}
    {/* REVIEW INFO */}
    {isReviewInfoOpen && (
      <ReviewInfo
        goToCartModal={goToCartModal}
        goBackToBilling={goBackToBilling}
        placeOrderDetails={placeOrderDetails}
        closeModal={closeReviewModal}
      />
    )}

    {/* CART MODAL */}
    {isCartOpen && placeOrderDetails.lineItems.length > 0 && (
      <CartModal
        goToCheckout={goToCheckout}
        placeOrderDetails={placeOrderDetails}
        removeFromCart={removeFromCart}
        closeModal={closeCartModal}
      />
    )}

    {/* CHECKOUT MODAL */}
    {isCheckoutOpen && (
      <CheckoutModal
        placeOrderDetails={placeOrderDetails}
        closeModal={closeCheckoutModal}
      />
    )}
    {/* MODALS MESSAGE */}
    {isInfoModalOpen && (
      <SuccessModal btnHandler={infoModalHandler} message={infoMessage} />
    )}
    {isErrorModalOpen && (
      <ErrorModal closeModal={closeErrorModal} message={errorMessage} />
    )}

    {/* CART ICON */}
    <CartIcon
      closeModal={closeListOfItemsModal}
      lineItems={placeOrderDetails.lineItems}
      totalQuantityProduct={totalQuantityProduct}
    />
    {/* CartIcon ->ListOfItems */}
    {isListOfItemsOpen && placeOrderDetails.lineItems.length > 0 && (
      <ListOfItems
        goToShipping={goFromListItemsToShipping}
        placeOrderDetails={placeOrderDetails}
        removeFromCart={removeFromCart}
        closeModal={closeListOfItemsModal}
      />
    )}
  </UiEntity>
);
//FUNCTIONS GO TO
// step.1 open article
export function goToArticleDetail(article: Article) {
  article.attributes.forEach((attribute) => {
    selectedAttributes[attribute.name] = attribute.options[0].value[0];
  });
  articleType = article.type;
  selectedArticle = { ...article };
  if (articleType === "variable") {
    getVariationData(selectedArticle, selectedAttributes);
  }
  isArticleOpen = true;
  isCartOpen = false;
  selectedOptions = {};
}
// step.2 -> buy now -> shipping info
function goToShipping() {
  selectedOptionsArray.push(selectedOptions);
  isArticleOpen = false;
  isShippingInfoOpen = true;
  selectedOptions = {};
}

// placeOrder -> add number of items to cart icon and close modal
function addToCartIcon() {
  isArticleOpen = false;
  isListOfItemsOpen = false;
  selectedOptions = {};
  selectedOptionsArray.push(selectedOptions);
}

// step.3 -> shipping -> billing
function goToBillingInfo() {
  isBillingInfoOpen = true;
  isShippingInfoOpen = false;
  // isReviewInfoOpen = false
}
// step.4 -> billing -> review
function goToReviewInfo() {
  isBillingInfoOpen = false;
  isReviewInfoOpen = true;
}
// step.5 ->review -> cart
function goToCartModal() {
  isReviewInfoOpen = false;
  isCartOpen = true;
}
// step.6 -> cart -> payment
function goToCheckout() {
  isCartOpen = false;
  isCheckoutOpen = true;
}
//alternative step.7 -> CartIcon -> shipping
function goFromListItemsToShipping() {
  isListOfItemsOpen = false;
  isShippingInfoOpen = true;
}

//FUNTION GO BACK
function goBackToArticle() {
  isShippingInfoOpen = false;
  isArticleOpen = true;
}
function goBackToShipping() {
  // isCartOpen = false
  isBillingInfoOpen = false;
  isShippingInfoOpen = true;
}
function goBackToBilling() {
  // isCartOpen = false
  isBillingInfoOpen = true;
  isReviewInfoOpen = false;
}

//FUNCTION CLOSE MODALS
function closeArticleModal() {
  isArticleOpen = !isArticleOpen;
  selectedArticle = null;
}
function closeShippingModal() {
  isShippingInfoOpen = !isShippingInfoOpen;
  //cambio
  isArticleOpen = false;
}
function closeBillingModal() {
  isBillingInfoOpen = !isBillingInfoOpen;
  isShippingInfoOpen = false;
}
function closeReviewModal() {
  isReviewInfoOpen = !isReviewInfoOpen;
}
function closeCartModal() {
  isCartOpen = !isCartOpen;
}
function closeCheckoutModal() {
  isCheckoutOpen = !isCheckoutOpen;
}

function closeListOfItemsModal() {
  isListOfItemsOpen = !isListOfItemsOpen;
  isShippingInfoOpen = false;
}
function closeErrorModal() {
  isErrorModalOpen = false;
}

function removeFromCart(productId: number) {
  const prd = productId.toString();

  const removedOption = placeOrderDetails.lineItems.find((option) => {
    const optionId = option.variationId
      ? option.variationId.toString()
      : option.productId.toString();

    return optionId === prd;
  });

  if (removedOption) {
    totalQuantityProduct -= removedOption.quantity;

    placeOrderDetails.lineItems = placeOrderDetails.lineItems.filter(
      (option) => {
        const optionId = option.variationId
          ? option.variationId.toString()
          : option.productId.toString();

        return optionId !== prd;
      }
    );
  }
}

export function infoModal(message?: string) {
  if (message) infoMessage = message;
  else infoMessage = "Success";
  isInfoModalOpen = true;
  isCheckoutOpen = false;
  isErrorModalOpen = false;
  isBillingInfoOpen = false;
}

export function errorModal(message?: string) {
  if (message) errorMessage = message;
  else errorMessage = "Something went wrong, please try again later.";
  isInfoModalOpen = false;
  isErrorModalOpen = true;
}

function infoModalHandler() {
  if (infoMessageCb) infoMessageCb(isInfoModalOpen);
  else isInfoModalOpen = false;
}
