export type InputProps = {
  title?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  msg?: string;
  value?: string | number;
  key?: string;
  type?: string;
};

export type DynamicConfig = {
  GoogleClientId: string;
  ServiceBaseUrl: string;
  GoogleMapKey: string;
};

export type AuthToken = {
  exp: EpochTimeStamp;
  user_id: number;
  email: string;
  name: string;
};

export type MetaData = {
  Authorization: string;
  [x: string]: string;
};
