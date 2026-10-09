import { useEffect, useState } from "react";
import {
  BottomBar,
  BottomBarButton,
  BottomBarText,
  CategoryChip,
  CategoryList,
  CategoryText,
  Header,
  ProductCard,
  ProductGrid,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ProductRating,
  ProductTitle,
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
  rating: {
    rate: number;
    count: number;
  };
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  const filteredProducts: Product[] = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScreenContainer>
      <Header>
        <ScreenTitle>Loja</ScreenTitle>
        <SearchInput
          placeholder="Buscar Produtos"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <CategoryList
          data={["all", ...categories]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryChip active={category === item} onPress={() => setCategory(item)}>
              <CategoryText>{item === "all" ? "Todos" : item}</CategoryText>
            </CategoryChip>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        />
      </Header>

      <ProductGrid
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard>
            <ProductImage source={{ uri: item.image }} resizeMode="contain" />

            <ProductInfo>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
              <ProductRating>
                {item.rating.rate} ({item.rating.count})
              </ProductRating>
            </ProductInfo>
          </ProductCard>
        )}
      />

      <BottomBar>
        <BottomBarButton>
          <BottomBarText active>Início</BottomBarText>
        </BottomBarButton>

        <BottomBarButton>
          <BottomBarText> Buscar </BottomBarText>
        </BottomBarButton>

        <BottomBarButton>
          <BottomBarText> Carrinho </BottomBarText>
        </BottomBarButton>

        <BottomBarButton>
          <BottomBarText> Perfil </BottomBarText>
        </BottomBarButton>
      </BottomBar>
    </ScreenContainer>
  );
}
