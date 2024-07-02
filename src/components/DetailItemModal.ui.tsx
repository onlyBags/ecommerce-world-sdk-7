import { Color4 } from "@dcl/sdk/math";
import ReactEcs, {
  Button,
  Dropdown,
  Label,
  UiEntity,
} from "@dcl/sdk/react-ecs";
import { type Article } from "../types";
import { selectColor } from "../utils";

interface DetailItemModalProps {
  selectedArticle: Article;
  quantityOptions: string[];
  selectedOptions: Record<string, string>;
  closeModal: () => void;
  goToCart: (selectedQty: string) => void;
  datasourceId: number;
}

let selectedQuantity = "1";
let variablePrice = "";
let variableId = "";
let showVariablePrice = false;

export const DetailItemModal = ({
  selectedArticle,
  quantityOptions,
  selectedOptions,
  closeModal,
  goToCart,
  datasourceId,
}: DetailItemModalProps) => {
  selectedOptions["productId"] = selectedArticle.productId.toString();
  selectedOptions["name"] = selectedArticle.name;
  selectedOptions["image"] = selectedArticle.images[0].src;
  selectedOptions["price"] = selectedArticle.price;

  const updatePrice = async () => {
    const queryAttributes = selectedArticle?.attributes
      .map((attribute) => {
        const attributeName = attribute.name.toLowerCase();
        return `attributes=${attributeName}`;
      })
      .join("&");

    const queryValues = selectedArticle?.attributes
      .map((attribute) => {
        const selectedValue = encodeURIComponent(
          selectedOptions[attribute.name]
        );
        return `values=${selectedValue}`;
      })
      .join("&");

    const queryAttributesAndValues = [queryAttributes, queryValues].join("&");

    try {
      let response = await fetch(
        `https://ecommerce-api.dglive.org/v1/woocommerce/variation/${datasourceId}/${selectedArticle?.productId}?${queryAttributesAndValues}`
      );

      let json = await response.json();

      variablePrice = json.data.price.toString();
      variableId = json.data.id.toString();
    } catch (error) {
      console.error("Error:", error);
    }
    showVariablePrice = true;
  };
  if (selectedArticle.type !== "variable") {
    showVariablePrice = false;
  }
  if (variablePrice === "") {
    variablePrice = selectedArticle.price;
  }

  return (
    <UiEntity
      uiTransform={{
        width: 750,
        height: 350,
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
      uiText={{
        value: selectedArticle.name,
        fontSize: 33,
        textAlign: "top-center",
      }}
      uiBackground={{ color: selectColor("modalColor") }}
    >
      <UiEntity
        uiTransform={{
          display: "flex",
          flexDirection: "row",
          height: "20%",

          alignItems: "center",
        }}
      >
        <UiEntity
          uiTransform={{
            width: 30,
            height: 30,
          }}
          uiBackground={{
            textureMode: "nine-slices",
            texture: {
              src: "images/Cancel_btn.png",
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
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: "100%",
        }}
      >
        <UiEntity
          uiTransform={{
            width: "60%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: { top: "20px", bottom: "10px" },
          }}
        >
          <UiEntity
            uiTransform={{
              width: 220,
              height: 550,
            }}
            uiBackground={{
              textureMode: "stretch",
              texture: {
                src: `https://ecommerce-api.dglive.org/v1/image?src=${selectedArticle?.images[0]?.src}`,
              },
            }}
          />
          <UiEntity
            uiTransform={{
              height: "225px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Label
              value="Qty:"
              fontSize={14}
              uiTransform={{
                width: "150px",
                height: "40px",
              }}
            />
            <Dropdown
              options={quantityOptions}
              onChange={(value) => (selectedQuantity = quantityOptions[value])}
              color={Color4.White()}
              uiTransform={{
                width: "150px",
                height: "40px",
              }}
              fontSize={14}
            />
          </UiEntity>
        </UiEntity>

        <UiEntity
          uiTransform={{
            width: "100%",
            flexDirection: "column",
            padding: { top: "20px" },
          }}
        >
          <UiEntity
            uiTransform={{
              width: "100%",
              height: 390,
              flexWrap: "wrap",
            }}
          >
            {selectedArticle?.attributes.map((attribute, i) => {
              if (!selectedOptions[attribute.name]) {
                selectedOptions[attribute.name] = attribute.options[0].value[0];
              }

              return (
                <UiEntity
                  uiTransform={{
                    height: "100px",
                    flexDirection: "column",
                  }}
                  key={selectedArticle?.attributes[i].id}
                >
                  <Label
                    value={attribute.name}
                    fontSize={14}
                    uiTransform={{
                      width: "140px",
                      height: "40px",
                    }}
                  />
                  <Dropdown
                    options={attribute?.options.flatMap(
                      (option) => option.value
                    )}
                    onChange={(value) => {
                      let selectedValue = attribute?.options[value].value[0];
                      selectedOptions[attribute.name] = selectedValue;
                      updatePrice();
                    }}
                    color={Color4.White()}
                    uiTransform={{
                      width: "140px",
                      height: "40px",
                      margin: { right: "5px" },
                    }}
                    fontSize={14}
                  />
                </UiEntity>
              );
            })}
          </UiEntity>

          <UiEntity uiTransform={{ height: "31%", justifyContent: "flex-end" }}>
            <UiEntity
              uiTransform={{
                width: 40,
                height: 40,
              }}
              uiBackground={{
                textureMode: "nine-slices",
                texture: {
                  src: "images/payments/ice.png",
                },
                textureSlices: {
                  top: 1,
                  bottom: 1,
                  left: 1,
                  right: 1,
                },
              }}
            />
            <Label
              value={
                showVariablePrice && variablePrice !== ""
                  ? `${variablePrice} `
                  : selectedOptions["price"]
              }
              fontSize={29}
              textAlign="top-left"
              uiTransform={{ width: "100px" }}
            />
            <Button
              uiTransform={{ width: 150, height: 40, margin: { top: "4px" } }}
              value="Add to cart"
              uiBackground={{ color: selectColor("btnPrimary") }}
              fontSize={22}
              onMouseDown={() => {
                selectedOptions["qty"] = selectedQuantity;
                goToCart(selectedQuantity);
                selectedQuantity = "1";
                if (selectedArticle.type === "variable") {
                  selectedOptions["price"] = variablePrice;
                  selectedOptions["variationId"] = variableId;
                }
                variablePrice = "";
                variableId = "";
              }}
            />
            <UiEntity />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  );
};
