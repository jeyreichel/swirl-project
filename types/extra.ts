export interface Item {
  id: string;
  amount: number;
}

export interface Cart {
  items: Item[];
}

export interface TaxInfo {
  currency: string;
  line_items: LineItem[];
  customer_details: CustomerDetails;
  shipping_cost: ShippingCost;
}

export interface ShippingCost {
  amount: number;
  tax_code: string;
}

export interface LineItem {
  amount: number;
  reference: string;
  tax_code: string;
}

export interface CustomerDetails {
  address: Address;
  address_source: string;
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
