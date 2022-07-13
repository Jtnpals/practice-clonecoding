import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import client from "@libs/server/client";

export interface ProductWithCount extends Product {
  _count: { favs: number };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <Layout seoTitle="홈" title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {data
          ? data?.products?.map((product) => (
              <Item
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price}
                comments={1}
                hearts={product?._count?.favs}
              />
            ))
          : "loading"}
        <FloatingButton href="/products/upload">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({});
  console.log(products);
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}

export default Page;
