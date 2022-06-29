import useSWR from "swr";
import type { ProductWithCount } from "pages";
import Item from "./item";

interface Record {
  id: number;
  product: ProductWithCount;
}
interface ProductsResponse {
  [key: string]: Record[];
}

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductsResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          comments={1}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
