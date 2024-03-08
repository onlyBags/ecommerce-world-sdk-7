import { Entity } from '@dcl/sdk/ecs'

export interface Article {
  id: number
  variationId?: number
  productId: number
  syncedAt: Date
  datasourceId: number
  name: string
  slug: string
  permalink: string
  dateCreated: Date
  dateCreatedGmt: null
  dateModified: Date
  dateModifiedGmt: null
  type: string
  status: string
  featured: boolean
  catalogVisibility: string
  description: string
  shortDescription: string
  sku: string
  price: string
  regularPrice: string
  salePrice: string
  dateOnSaleFrom: null
  dateOnSaleFromGmt: null
  dateOnSaleTo: null
  dateOnSaleToGmt: null
  priceHtml: null
  onSale: boolean
  purchasable: boolean
  totalSales: number
  virtual: boolean
  downloadable: boolean
  downloads: null
  downloadLimit: number
  downloadExpiry: number
  externalUrl: string
  buttonText: string
  taxStatus: string
  taxClass: string
  manageStock: boolean
  stockQuantity: null
  stockStatus: string
  backorders: string
  backordersAllowed: boolean
  backordered: boolean
  soldIndividually: boolean
  weight: string
  shippingRequired: boolean
  shippingTaxable: boolean
  shippingClass: string
  shippingClassId: number
  reviewsAllowed: boolean
  averageRating: string
  ratingCount: number
  relatedIds: string
  upsellIds: string
  crossSellIds: string
  parentId: number
  purchaseNote: string
  defaultAttributes: null
  variations: string
  groupedProducts: string
  menuOrder: number
  jetpackPublicizeConnections: null
  images: Image[]
  categories: Category[]
  attributes: Attribute[]
  slot: Slot[]
}

export interface Attribute {
  id: number
  attributeId: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: Option[]
}

export interface Option {
  id: number
  value: string[]
}

export interface Category {
  id: number
  categoryId: number
  name: string
  slug: string
}

export interface Image {
  id: number
  imageId: number
  dateCreated: null
  dateCreatedGmt: null
  dateModified: null
  dateModifiedGmt: null
  src: string
  name: string
  alt: null
}

export interface Slot {
  id: number
  enabled: boolean
  name: string
  posX: number
  posY: number
  posZ: number
  rotX: number
  rotY: number
  rotZ: number
  sizeX: number
  sizeY: number
  sizeZ: number
  image: string
}

export interface ShippingLine {
  methodId: string
  methodTitle: string
  total?: string
}

export interface LineItem {
  productId: number
  quantity: number
  price?: number
  variationId?: number
  name?: string
  image?: string
}

export interface Shipping {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  postcode: string
  country: string
}

export interface Billing extends Shipping {
  email?: string
  phone?: string
}

export interface PlaceOrderDetails {
  paymentMethod: string
  paymentMethodTitle: string
  wallet: string
  shippingId?: number
  billingId?: number
  saveBilling?: boolean
  saveShipping?: boolean
  billing: Billing
  shipping: Shipping
  lineItems: LineItem[]
  shippingLines: ShippingLine[]
}

export type SelectedAttributes = {
  [key: string]: string
}

export interface RawOrder {
  id: number
  parent_id: number
  status: string
  currency: string
  version: string
  prices_include_tax: boolean
  date_created: string
  date_modified: string
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  customer_id: number
  order_key: string
  payment_method: string
  payment_method_title: string
  transaction_id: string
  customer_ip_address: string
  customer_user_agent: string
  created_via: string
  customer_note: string
  date_completed: any
  date_paid: string
  cart_hash: string
  number: string
  tax_lines: any[]
  fee_lines: any[]
  coupon_lines: any[]
  refunds: any[]
  payment_url: string
  is_editable: boolean
  needs_payment: boolean
  needs_processing: boolean
  date_created_gmt: string
  date_modified_gmt: string
  date_completed_gmt: any
  date_paid_gmt: string
  currency_symbol: string
}

export interface Customer {
  id: string
  wallet: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
export interface Order {
  id: number
  customer: Customer
  storeOrderId: number
  status: string
  currency: string
  total: number
  orderKey: string
  totalIce: number
  iceValue: number
  iceValueTimestamp: Date
}

export interface WcOrderRes {
  dgLiveOrder: Order
  raw: RawOrder
}

export interface BuyPayload {
  id: number
  price: number
  beneficiaryWallet: string
  userWallet: string
  datasource: number
}

export type WSEventType = 'joystick' | 'ecommerce'

export interface EcommerceWsData {
  type: WSEventType
  datasource: number
  wallet: string
  status: 'success' | 'fail' | 'pending'
  orderId: number
}
export interface WsSlot {
  slotId: number
  entity: Entity
}

export interface joystickData {
  posX: number
  posY: number
  posZ: number
  rotX: number
  rotY: number
  rotZ: number
  sizeX: number
  sizeY: number
  sizeZ: number
  slotId: number
}

export interface Address {
  address1: string
  address2: string
  city: string
  country: string
  customer: {
    id: number
    wallet: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  email: string | null
  firstName: string
  id: number
  lastName: string
  phone: string | null
  postcode: string
  state: string
}

export interface UserData {
  billingAddress: Address[]
  shippingAddress: Address[]
}
