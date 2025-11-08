export type InputProps = {
  title?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  msg?: string;
  value?: string;
  key?: string;
};
