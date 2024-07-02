import { Entity } from "@dcl/sdk/ecs";

export interface Slot {
  id: number;
  name: string;
  enabled: boolean;
  article: Article;
  posX: number;
  posY: number;
  posZ: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  image: string;
}

export interface Article {
  id: number;
  variationId?: number;
  productId: number;
  datasourceId: number;
  name: string;
  type: "simple" | "variable";
  description: string;
  shortDescription: string;
  sku: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  shopType: "woocommerce" | "magento";
  images: Image[];
  categories: Category[];
  attributes: Attribute[];
}

export interface Attribute {
  id: number;
  attributeId: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: Option[];
}

export interface Option {
  id: number;
  value: string[];
}

export interface Category {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  src: string;
  name: string;
  alt: null;
}

// export interface WoocommerceProduct {
//   id: number;
//   variationId?: number;
//   productId: number;
//   syncedAt: string;
//   datasourceId: number;
//   name: string;
//   slug: string;
//   permalink: string;
//   dateCreated: string;
//   dateCreatedGmt: string | null;
//   dateModified: string;
//   dateModifiedGmt: string | null;
//   type: string;
//   status: string;
//   featured: boolean;
//   catalogVisibility: string;
//   description: string;
//   shortDescription: string;
//   sku: string;
//   price: string;
//   regularPrice: string;
//   salePrice: string;
//   dateOnSaleFrom: string | null;
//   dateOnSaleFromGmt: string | null;
//   dateOnSaleTo: string | null;
//   dateOnSaleToGmt: string | null;
//   priceHtml: string | null;
//   onSale: boolean;
//   purchasable: boolean;
//   totalSales: number;
//   virtual: boolean;
//   downloadable: boolean;
//   downloads: any[] | null;
//   downloadLimit: number;
//   downloadExpiry: number;
//   externalUrl: string;
//   buttonText: string;
//   taxStatus: string;
//   taxClass: string;
//   manageStock: boolean;
//   stockQuantity: number | null;
//   stockStatus: string;
//   backorders: string;
//   backordersAllowed: boolean;
//   backordered: boolean;
//   soldIndividually: boolean;
//   weight: string;
//   shippingRequired: boolean;
//   shippingTaxable: boolean;
//   shippingClass: string;
//   shippingClassId: number;
//   reviewsAllowed: boolean;
//   averageRating: string;
//   ratingCount: number;
//   relatedIds: string;
//   upsellIds: string;
//   crossSellIds: string;
//   parentId: number;
//   purchaseNote: string;
//   defaultAttributes: any | null;
//   variations: string;
//   groupedProducts: string;
//   menuOrder: number;
//   jetpackPublicizeConnections: any | null;
//   images: Image[];
//   categories: Category[];
//   attributes: Attribute[];
// }

export interface ShippingLine {
  methodId: string;
  methodTitle: string;
  total?: string;
}

export interface LineItem {
  productId: number;
  quantity: number;
  price?: number;
  variationId?: number;
  name: string;
  description?: string;
  image?: string;
}

export interface Shipping {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
}

export interface Billing extends Shipping {
  phone?: string;
}

export interface PlaceOrderDetails {
  paymentMethod: "BAG" | "BINANCE" | "COINBASE";
  email: string;
  wallet: string;
  shippingId?: number;
  billingId?: number;
  saveBilling?: boolean;
  saveShipping?: boolean;
  billing: Billing;
  shipping: Shipping;
  lineItems: LineItem[];
  shippingLines: ShippingLine[];
}

export type SelectedAttributes = {
  [key: string]: string;
};

export interface RawOrder {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: any;
  date_paid: string;
  cart_hash: string;
  number: string;
  tax_lines: any[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: any;
  date_paid_gmt: string;
  currency_symbol: string;
}

export interface Customer {
  id: string;
  wallet: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Order {
  id: number;
  customer: Customer;
  storeOrderId: number;
  status: string;
  currency: string;
  total: number;
  orderKey: string;
  totalIce: number;
  iceValue: number;
  iceValueTimestamp: Date;
}

export interface OnlyBagsOrderCreatedRes {
  dgLiveOrder: Order;
  raw: RawOrder;
}

export interface BuyPayload {
  id: number;
  price: number;
  beneficiaryWallet: string;
  userWallet: string;
  datasource: number;
}

export type WSEventType = "joystick" | "ecommerce";

export interface EcommerceWsData {
  type: WSEventType;
  datasource: number;
  wallet: string;
  status: "success" | "fail" | "pending";
  orderId: number;
}
export interface WsSlot {
  slotId: number;
  entity: Entity;
}

export interface joystickData {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  slotId: number;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  country: string;
  customer: {
    id: number;
    wallet: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string | null;
  postcode: string;
  state: string;
}

export interface UserData {
  billingAddress: Address[];
  shippingAddress: Address[];
}

export type AvailableContracts = "ecommerce" | "bag";

export interface DomainData {
  name: string;
  version: string;
  salt: string;
  verifyingContract: string;
}

export interface DomainType {
  name: string;
  type: string;
}

export interface ContractConfigProps {
  [key: string]: ContractData;
}

export interface ContractData {
  address: string;
  abi: ContractEvent[];
  domainType: DomainType[];
  domain: DomainData;
  types: Record<string, { name: string; type: string }[]>;
}

interface ContractEvent {
  anonymous: boolean;
  inputs: ContractEventInput[];
  name: string;
  type: string;
}

interface ContractEventInput {
  indexed: boolean;
  internalType: string;
  name: string;
  type: string;
}

export interface BinanceLink {
  prepayId: string;
  terminalType: string;
  expireTime: number;
  qrcodeLink: string;
  qrContent: string;
  checkoutUrl: string;
  deeplink: string;
  universalUrl: string;
  currency: string;
}

interface Addresses {
  polygon: string;
  pusdc: string;
  pweth: string;
  ethereum: string;
  usdc: string;
  dai: string;
  apecoin: string;
  shibainu: string;
  tether: string;
  bitcoincash: string;
  dogecoin: string;
  litecoin: string;
  bitcoin: string;
}

interface LocalExchangeRates {
  "APE-USD": string;
  "BCH-USD": string;
  "BTC-USD": string;
  "DAI-USD": string;
  "ETH-USD": string;
  "LTC-USD": string;
  "DOGE-USD": string;
  "SHIB-USD": string;
  "USDC-USD": string;
  "USDT-USD": string;
  "PUSDC-USD": string;
  "PWETH-USD": string;
  "PMATIC-USD": string;
}
interface ExchangeRates extends LocalExchangeRates {}

interface Local {
  amount: string;
  currency: string;
}
interface Polygon {
  amount: string;
  currency: string;
}
interface Pusdc {
  amount: string;
  currency: string;
}
interface Pweth {
  amount: string;
  currency: string;
}
interface Ethereum {
  amount: string;
  currency: string;
}
interface Settelment {
  amount: string;
  currency: string;
}
interface Usdc {
  amount: string;
  currency: string;
}
interface Dai {
  amount: string;
  currency: string;
}
interface Apecoin {
  amount: string;
  currency: string;
}
interface Shibainu {
  amount: string;
  currency: string;
}
interface Tether {
  amount: string;
  currency: string;
}
interface Bitcoincash {
  amount: string;
  currency: string;
}
interface Dogecoin {
  amount: string;
  currency: string;
}
interface Litecoin {
  amount: string;
  currency: string;
}
interface Bitcoin {
  amount: string;
  currency: string;
}
interface Pricing {
  local: Local;
  polygon: Polygon;
  pusdc: Pusdc;
  pweth: Pweth;
  ethereum: Ethereum;
  usdc: Usdc;
  dai: Dai;
  apecoin: Apecoin;
  shibainu: Shibainu;
  tether: Tether;
  bitcoincash: Bitcoincash;
  dogecoin: Dogecoin;
  litecoin: Litecoin;
  bitcoin: Bitcoin;
  settlement: Settelment;
}

interface Timeline {
  status: string;
  time: Date;
}

export interface CoinbasePaymentStatusData {
  addresses: Addresses;
  brand_color: string;
  brand_logo_url: string;
  code: string;
  coinbase_managed_merchant: boolean;
  created_at: Date;
  exchange_rates: ExchangeRates;
  expires_at: Date;
  fee_rate: number;
  fees_settled: boolean;
  hosted_url: string;
  id: string;
  local_exchange_rates: LocalExchangeRates;
  logo_url: string;
  metadata: Record<string, string>;
  name: string;
  offchain_eligible: boolean;
  organization_name: string;
  payments: any[];
  pricing: Pricing;
  pricing_type: string;
  pwcb_only: boolean;
  redirect_url: string;
  resource: string;
  support_email: string;
  timeline: Timeline[];
  utxo: boolean;
}
