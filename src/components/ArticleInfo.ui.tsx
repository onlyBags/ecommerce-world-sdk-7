import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { Dropdown, Label, UiEntity } from "@dcl/sdk/react-ecs";
import {
  Article,
  LineItem,
  PlaceOrderDetails,
  SelectedAttributes,
} from "../types";
import {
  MODAL_LEFT_SIZE,
  MODAL_RIGHT_SIZE,
  MODAL_SIZE,
  getVariationData,
} from "../utils";
import ModalClose from "./ModalClose.ui";
import config from "../config";
import { images } from "../assets/images";
const { baseUrl, maxItemQuantity } = config;

interface ArticleInfoProps {
  selectedArticle: Article;
  selectedAttributes: SelectedAttributes;
  goToShipping: () => void;
  addToCartIcon: () => void;
  closeModal: () => void;
  placeOrderDetails: PlaceOrderDetails;
  articleType: string;
  datasourceId: number;
}

let itemQuantity = "1";
let selectedImageURL = "";
let quantityOptions: string[] = Array.from(Array(maxItemQuantity).keys()).map(
  (i) => (i + 1).toString()
);

const handleQuantityUpdate = (value: number) => {
  itemQuantity = (value + 1).toString();
};

const handleAddProductToCart = async ({
  placeOrderDetails,
  selectedArticle,
  goToShipping,
}: {
  placeOrderDetails: PlaceOrderDetails;
  selectedArticle: Article;
  goToShipping: () => void;
}) => {
  // console.log('selectedArticle: ', selectedArticle)

  const foundLineItem = placeOrderDetails.lineItems.find((lineItem) => {
    if (selectedArticle.variationId) {
      return lineItem.variationId === selectedArticle.variationId;
    } else {
      return lineItem.productId === selectedArticle.productId;
    }
  });
  if (foundLineItem) {
    foundLineItem.quantity += +itemQuantity;
  } else {
    const newItem: LineItem = {
      productId: selectedArticle.productId,
      quantity: +itemQuantity,
      price: +selectedArticle.price,
      name: selectedArticle.name,
      image: selectedArticle.images[0].src,
    };
    if (selectedArticle.variationId)
      newItem.variationId = selectedArticle.variationId;
    placeOrderDetails.lineItems.push(newItem);
  }
  goToShipping();
  itemQuantity = "1";
};

const handleAddProductToCartIcon = async ({
  placeOrderDetails,
  selectedArticle,
  addToCartIcon,
}: {
  placeOrderDetails: PlaceOrderDetails;
  selectedArticle: Article;
  addToCartIcon: () => void;
}) => {
  // console.log('selectedArticle: ', selectedArticle)

  const foundLineItem = placeOrderDetails.lineItems.find((lineItem) => {
    if (selectedArticle.variationId) {
      return lineItem.variationId === selectedArticle.variationId;
    } else {
      return lineItem.productId === selectedArticle.productId;
    }
  });
  if (foundLineItem) {
    foundLineItem.quantity += +itemQuantity;
  } else {
    const newItem: LineItem = {
      productId: selectedArticle.productId,
      quantity: +itemQuantity,
      price: +selectedArticle.price,
      name: selectedArticle.name,
      image: selectedArticle.images[0].src,
    };
    if (selectedArticle.variationId)
      newItem.variationId = selectedArticle.variationId;
    placeOrderDetails.lineItems.push(newItem);
  }
  addToCartIcon();
  itemQuantity = "1";
};

export const ArticleInfo = ({
  selectedArticle,
  selectedAttributes,
  goToShipping,
  addToCartIcon,
  closeModal,
  placeOrderDetails,
  articleType,
  datasourceId,
}: ArticleInfoProps) => {
  const getPrice = () => {
    return +itemQuantity * +selectedArticle.price.toString();
  };
  return (
    <UiEntity
      uiTransform={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <UiEntity
        uiTransform={{
          width: MODAL_SIZE.width,
          height: MODAL_SIZE.height,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <UiEntity
          uiTransform={{
            width: MODAL_LEFT_SIZE.width,
            height: MODAL_LEFT_SIZE.height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          uiBackground={{
            color: Color4.lerp(
              Color4.fromHexString("#D0C0B3"),
              Color4.fromHexString("#E3DFDC"),
              0.7
            ),
          }}
        >
          <UiEntity
            uiTransform={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: { left: 20, right: 20, top: 20 },
            }}
          >
            <UiEntity
              uiBackground={{
                textureMode: "stretch",
                texture: {
                  src: `${baseUrl}/image?src=${
                    selectedImageURL
                      ? selectedImageURL
                      : selectedArticle?.images[0]?.src
                  }`,
                },
              }}
              uiTransform={{ width: "100%", height: "80%" }}
            />
            <UiEntity
              uiTransform={{
                width: "100%",
                height: "17%",
                display: "flex",
                justifyContent: "flex-start",
                margin: { top: 20 },
              }}
            >
              {selectedArticle.images.map((image, i) => {
                return (
                  <UiEntity
                    key={i}
                    uiTransform={{
                      width: 75,
                      height: 75,
                      margin: { right: 10 },
                    }}
                    uiBackground={{
                      textureMode: "stretch",
                      texture: {
                        src: `${baseUrl}/image?src=${image.src}`,
                      },
                    }}
                    onMouseDown={() => {
                      selectedImageURL = image.src;
                    }}
                  />
                );
              })}
            </UiEntity>
          </UiEntity>
        </UiEntity>
        <UiEntity
          uiTransform={{
            width: MODAL_RIGHT_SIZE.width,
            height: MODAL_RIGHT_SIZE.height,
            display: "flex",
            flexDirection: "column",
          }}
          uiBackground={{ color: Color4.fromHexString("#E5E5E5") }}
        >
          <UiEntity
            uiTransform={{ margin: { top: 20, left: 20 } }}
            uiText={{
              value: "Item Type",
              fontSize: 12,
              textAlign: "top-left",
              color: Color4.fromHexString("#121417"),
            }}
          />
          <UiEntity
            uiTransform={{ margin: { top: 15, left: 20 } }}
            uiText={{
              value: selectedArticle.name,
              fontSize: 24,
              textAlign: "top-left",
              color: Color4.fromHexString("#121417"),
            }}
          />
          <UiEntity
            uiTransform={{
              margin: { top: 35, left: 20 },
              width: "90%",
              height: "70px",
              display: "flex",
              flexWrap: "wrap",
            }}
            uiText={{
              value:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut bibendum lectus.",
              fontSize: 12,
              textAlign: "top-left",
              color: Color4.fromHexString("#121417"),
            }}
          />
          <UiEntity
            uiTransform={{
              width: "100%",
              height: "50%",
              display: "flex",
              flexWrap: "wrap",
              padding: { left: 20, right: 10 },
              justifyContent: "flex-start",
            }}
          >
            {selectedArticle?.attributes.map((attribute, i) => {
              return (
                <UiEntity
                  key={i}
                  uiTransform={{
                    display: "flex",
                    flexDirection: "column",
                    height: "25%",
                    margin: { right: 20 },
                  }}
                >
                  <Label
                    value={attribute.name}
                    fontSize={12}
                    uiTransform={{
                      width: "100%",
                      height: "20px",
                    }}
                    color={Color4.Black()}
                    textAlign="middle-left"
                  />
                  <Dropdown
                    options={attribute?.options.flatMap(
                      (option) => option.value
                    )}
                    onChange={(value) => {
                      let selectedValue = attribute?.options[value].value[0];
                      selectedAttributes[attribute.name] = selectedValue;
                      articleType === "variable" &&
                        getVariationData(
                          selectedArticle,
                          selectedAttributes,
                          datasourceId
                        );
                    }}
                    uiTransform={{
                      width: "230px",
                      height: "35px",
                    }}
                    uiBackground={{ color: Color4.White() }}
                  />
                </UiEntity>
              );
            })}
            <UiEntity
              uiTransform={{
                display: "flex",
                flexDirection: "column",
                height: "25%",
                margin: { right: 20 },
              }}
            >
              <Label
                color={Color4.Black()}
                value="Amount"
                fontSize={12}
                uiTransform={{
                  width: "100%",
                  height: "20px",
                }}
                textAlign="middle-left"
              />
              <Dropdown
                options={quantityOptions}
                onChange={handleQuantityUpdate}
                uiTransform={{
                  width: "230px",
                  height: "35px",
                }}
                uiBackground={{ color: Color4.White() }}
                fontSize={12}
              />
            </UiEntity>
          </UiEntity>

          <UiEntity
            uiTransform={{
              height: "100px",
              width: "100%",
              padding: { left: 20, right: 20 },
              display: "flex",
            }}
          >
            <UiEntity
              uiTransform={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "50%",
              }}
            >
              <UiEntity
                uiText={{
                  value: "Price",
                  textAlign: "middle-left",
                  fontSize: 12,
                  color: Color4.Black(),
                }}
                uiTransform={{ height: "20%", width: "100%" }}
              />
              <UiEntity
                uiText={{
                  value: "$" + getPrice(),
                  textAlign: "bottom-left",
                  fontSize: 35,
                  color: Color4.Black(),
                }}
                uiTransform={{ height: "72%", width: "100%" }}
              />
            </UiEntity>

            <UiEntity
              uiTransform={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "50%",
                margin: { left: 25 },
              }}
            >
              <UiEntity
                uiText={{
                  value: "pay with",
                  textAlign: "middle-left",
                  fontSize: 12,
                  color: Color4.Black(),
                }}
                uiTransform={{ height: "20%", width: "100%" }}
              />
              <UiEntity
                uiTransform={{
                  width: 150,
                  height: 70,
                }}
                uiBackground={{
                  textureMode: "center",
                  texture: {
                    src: `${images.article.cardPayments}`,
                  },
                }}
              />
            </UiEntity>
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: "100%",
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: { top: 40 },
            }}
            uiBackground={{ color: Color4.White() }}
          >
            <UiEntity
              uiText={{
                value: "Buy Now",
                fontSize: 24,
                color: Color4.fromHexString("#FF2E55"),
                textAlign: "middle-center",
              }}
              uiTransform={{ width: "100%", height: "100%" }}
              // onMouseDown={closeModal}
              onMouseDown={() =>
                handleAddProductToCart({
                  placeOrderDetails,
                  selectedArticle,
                  goToShipping,
                })
              }
            />
            <UiEntity
              uiBackground={{
                textureMode: "center",
                texture: {
                  src: images.payments.line,
                },
              }}
              uiTransform={{ width: "20%", height: "100%" }}
            />
            <UiEntity
              uiTransform={{
                width: "100%",
                height: "100%",
              }}
            >
              <UiEntity
                uiTransform={{
                  width: 20,
                  height: "100%",
                  margin: { top: 2, right: "-40px" },
                }}
                uiBackground={{
                  textureMode: "center",
                  texture: {
                    src: images.article.plusIcon,
                  },
                }}
              />
              <UiEntity
                uiTransform={{ width: "100%", height: "100%" }}
                uiText={{
                  value: "Add To Cart",
                  fontSize: 24,
                  color: Color4.fromHexString("#FF2E55"),
                  textAlign: "middle-center",
                }}
                // onMouseDown={closeModal}
                // onMouseDown={closeModal}
                onMouseDown={() =>
                  handleAddProductToCartIcon({
                    placeOrderDetails,
                    selectedArticle,
                    addToCartIcon,
                  })
                }
              />
            </UiEntity>
          </UiEntity>
        </UiEntity>
        <ModalClose closeModal={closeModal} />
      </UiEntity>
    </UiEntity>
  );
};
