import ProductCardGrid from "./grid";
import ProductCardListHorizontal from "./horizontal";
import ProductCardList from "./list";
import ProductCardHighlighted from "./highlighted";
import ProductCardGridSkeleton from "./gridSkleton";
import ProductCardHighlightedSkeleton from "./highlightedSkeleton";

export const ProductCard = {
  List: ProductCardList,
  Grid: ProductCardGrid,
  GridSkeleton: ProductCardGridSkeleton,
  Horizontal: ProductCardListHorizontal,
  Highlighted: ProductCardHighlighted,
  HighlightedSkeleton: ProductCardHighlightedSkeleton,
};
