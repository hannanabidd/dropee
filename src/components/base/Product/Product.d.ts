export interface IProductProps {
  index: number;
  product: {
    title: string;
    description: string;
    price: number;
    isFavorite: boolean;
    rating: { rate: number; count: number };
  };
  onFav: (title: string) => void;
}