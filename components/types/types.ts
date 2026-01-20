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

export interface CreateRoomTypePayload {
  type: string;
  price: number;
  maxGuest: number;
  image: string;
  isShared: boolean;
  tags: string[];
}

export interface RoomCategoryType {
  _id: string;
  type: string;
  price: number;
  maxGuest: number;
  image: string;
  isShared: boolean;
}

export interface CreateRoom {
  roomNumber: string;
  categoryId: string;
  floor: string;
  amenities: string;
  images: File[];
  isAvailable: boolean;
}

export interface Room {
  id: string;
  roomNumber: string;
  category: string;
  floor: string;
  images: string[];
  maxGuest: number;
  status: "available" | "booked" | "maintenance";
}
