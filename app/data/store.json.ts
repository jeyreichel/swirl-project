export interface Template {
  type: string;
  url: string;
  price: string;
  image: string;
  name: string;
};
const productOne: Template = {
  name: "Alfred",
  price: "99",
  url: "/store/product-info",
  image: "https://lemonsqueezy.imgix.net/media/9887/7aa817d7-4efc-4d5b-a5a1-1ebd6cbbd247.png?fit=clip&h=1000&ixlib=php-3.3.1&w=1000&s=6b025867872051ad4cc5fcfd5b9f3995",
  type: "SaaS Multipage theme",
};
const productTwo: Template = {
    name: "Buio",
    price: "99",
    image: "https://lemonsqueezy.imgix.net/media/9887/5afeedde-42c3-40ce-99a6-872aa0f71ca9.png?fit=clip&h=1000&ixlib=php-3.3.1&w=1000&s=0198c14d9110f88380511570b2c7c5ae",
  url: "/store/product-info",
  type: "SaaS Multipage theme",
};
const productThree: Template = {
    name: "Riflesso",
    price: "99",
    image: "https://lemonsqueezy.imgix.net/media/9887/3598a7a7-8734-4a24-82c6-6728cbd07bdb.png?fit=clip&h=1000&ixlib=php-3.3.1&w=1000&s=058f5244cfb8803c8ab88cf96a2f7d7f",
  url: "/store/product-info",
  type: "Agency Multipage  theme",
};
const productFour: Template = {
    name: "Lexngton Bundle",
    price: "199",
    image: "https://lemonsqueezy.imgix.net/media/9887/dfc07d52-e0c4-4488-a7c4-163fbf6f6612.png?fit=clip&h=1000&ixlib=php-3.3.1&w=1000&s=d85afe7a7ff1da941ff960b2d1a9dda1",
  url: "/store/product-info",
  type: "Includes all templates on Lexingont themes",
};
export const byName = {
  productOne,
    productTwo,
    productThree,
  productFour,
};
export const store = Object.values(byName);
