type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductApiDto = {
  product_id: number;
  product_name: string;
  price: string;
};

const apiResponse: { data: ProductApiDto[] } = {
  data: [
    {
      product_id: 1,
      product_name: "Keyboard",
      price: "250000",
    },
  ],
};

function mapProduct(dto: ProductApiDto): Product {
  return {
    id: dto.product_id,
    name: dto.product_name,
    price: Number(dto.price),
  };
}

function renderProducts(products: Product[]) {
  for (const product of products) {
    console.log(`${product.name} - ${product.price.toLocaleString()} VND`);
  }
}

const products = apiResponse.data.map(mapProduct);

renderProducts(products);
