import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  padding: 20px 16px 10px;
`;

export const ScreenTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #222222;
  margin-bottom: 15px;
`;

export const SearchInput = styled.TextInput`
    height: 48px;
    background-color: #f0f0f0;
    border-radius: 12px;
    padding: 0 16px;
    font-size: 16px;
    color: #222222;
    margin-bottom: 15px;
  `;

export const CategoryList = styled(FlatList)`
  margin-bottom: 5px;
`;

interface CategoryChipProps {
  active?: boolean;
}

export const CategoryChip = styled.Pressable<CategoryChipProps>`
    padding: 10px 16px;
    border-radius: 20px;
    margin-right: 8px;

    background-color: ${({ active }) => (active ? "#222222" : "#eeeeee")};
  `;

export const CategoryText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #000;
`;
