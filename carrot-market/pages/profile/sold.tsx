import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import { ProductWithCount } from "pages";
import ProductList from "@components/product-list";

interface Record {
  id: number;
  product: ProductWithCount;
}
interface ProductsResponse {
  [key: string]: Record[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<ProductsResponse>(`/api/users/me/sales`);
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col pb-10 space-y-5 divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
