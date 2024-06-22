import { Color4 } from "@dcl/sdk/math";
import { UiTransformProps } from "@dcl/sdk/react-ecs";

import { errorModal, infoModal } from "./ui";
import {
  Article,
  LineItem,
  PlaceOrderDetails,
  SelectedAttributes,
  WcOrderRes,
} from "./types";
import config from "./config";
import { http } from "./http";
import { getUserWallet } from "./web3/web3Utils";
import { web3 } from "./web3/web3";

export const LABEL_FONT_SIZE = 10;
export const INPUT_FONT_SIZE = 12;

export const CONTAINER_BASE_PROPS: UiTransformProps = {
  height: "100%",
  width: 300,
  flexDirection: "column",
};

export const FORM_FIELDS_PROPS: UiTransformProps = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const LABEL_TRANSFORM: UiTransformProps = {
  height: 44,
};

export const INPUT_TRANSFORM: UiTransformProps = {
  height: 34,
  width: "80%",
  maxWidth: "80%",
};

export const MODAL_SIZE = {
  width: 950,
  height: 600,
  // height: 580
};

export const MODAL_LEFT_SIZE = {
  width: 420,
  height: MODAL_SIZE.height,
};

export const MODAL_RIGHT_SIZE = {
  width: 950 - 420,
  height: MODAL_SIZE.height,
};

const { baseUrl } = config;

export function getRandomHexColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function selectColor(color: string): Color4 {
  switch (color) {
    case "modalColor":
      return Color4.fromHexString("#272932");
    case "btnPrimary":
      return Color4.fromHexString("#256EFF");
    default:
      return Color4.White();
  }
}

export const calculateTotal = (lineItems: LineItem[]) => {
  let total = 0;
  lineItems.forEach((x) => {
    total += (x.price || 0) * x.quantity;
  });
  return total;
};

export async function postOrder(placeOrderDetails: PlaceOrderDetails) {
  try {
    const wallet = await getUserWallet();
    if (!wallet) return console.log("Error getting user wallet");
    const isApproved = await web3.isApproved(wallet);
    if (!isApproved) {
      const network = await web3.getNetwork();
      if (network !== "1") {
        return infoModal(
          `Please switch to Ethereum Mainnet, chainId: 1. \nYou are currently on chainId ${network}.`
        );
      } else {
        try {
          infoModal(`Please allow the marketplace to interact in your behalf.`);
          const approveRes = await web3.approve(wallet);
          console.log("approveRes: ", approveRes);
        } catch (error: any) {
          const message = `Error approving: ${
            error.message || "Something went wrong, try again later."
          }`;
          const chunkedMessage = message.match(new RegExp(`.{1,${50}}`, "g"));
          const errorMessage = chunkedMessage?.join("\n");
          return infoModal(errorMessage);
        }
      }
    }
    if (!wallet) return console.log("Error getting user wallet");
    const wcOrder: PlaceOrderDetails = {
      ...placeOrderDetails,
      wallet,
      lineItems: placeOrderDetails.lineItems.map((x) => ({
        productId: x.productId,
        quantity: x.quantity,
      })),
    };

    const res = await http.post<WcOrderRes>("woocommerce/order", {
      datasourceId: 1,
      wcOrder,
    });
    if (res.status === 200) {
      infoModal(
        "Order placed successfully! \nNow you have 5 mins to pay the order."
      );
      console.log("Order: ", res);

      const txHash = await web3.buy(
        {
          id: res.data.dgLiveOrder.storeOrderId,
          price: res.data.dgLiveOrder.totalIce,
          beneficiaryWallet: res.data.dgLiveOrder.customer.wallet,
          userWallet: wallet,
          datasource: 1,
        },
        infoModal
      );
      console.log("*************txHash: ", txHash);
      placeOrderDetails.lineItems = [];
    }
  } catch (error: any) {
    errorModal(
      "Error placing order: " + error?.message ||
        "Something went wrong, try again later."
    );
  }
}

export const getVariationData = async (
  selectedArticle: Article,
  selectedAttributes: SelectedAttributes
) => {
  const queryAttributes = selectedArticle?.attributes
    .map((attribute) => {
      const attributeName = attribute.name.toLowerCase();
      return `attributes=${attributeName}`;
    })
    .join("&");

  const queryValues = selectedArticle?.attributes
    .map((attribute) => {
      const selectedValue = encodeURIComponent(
        selectedAttributes[attribute.name]
      );
      return `values=${selectedValue}`;
    })
    .join("&");
  const queryAttributesAndValues = [queryAttributes, queryValues].join("&");

  try {
    let response = await fetch(
      `${baseUrl}/woocommerce/variation/1/${selectedArticle?.productId}?${queryAttributesAndValues}`,
      {
        headers: { "api-key": "apiKey" },
      }
    );
    let json = await response.json();
    selectedArticle.price = json.data.price.toString();
    selectedArticle.variationId = json.data.id;
  } catch (error) {
    console.error("Error:", error);
  }
};
