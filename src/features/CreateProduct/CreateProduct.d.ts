export type IFormProps = {
  'on-submit': (payload: {
    title: string;
    description: string;
    price: string;
  }) => void;
};