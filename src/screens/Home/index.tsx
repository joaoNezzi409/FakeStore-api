import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  CategoryChip,
  CategoryText,
  Header,
  ScreenContainer,
  ScreenTitle,
  SearchInput,
} from "./styled";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      await fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      await fetch("https://fakestoreapi.com/products/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }

    loadCategories();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScreenContainer>
      <Header>
        <ScreenTitle>Loja</ScreenTitle>
        <SearchInput
          placeholder="Buscar Produtos"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryChip>
              <CategoryText>{item}</CategoryText>
            </CategoryChip>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        />
      </Header>
    </ScreenContainer>
  );
}
