import axios, { Axios, AxiosError } from "axios";

export function handleChangeState<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  key: string,
) {
  setForm((prev) => {
    const updatedValue = { ...prev, [key]: e.target.value };
    return updatedValue;
  });
}

export function resolveError<T>(
  setForm: React.Dispatch<React.SetStateAction<T>>,
  key: string,
) {
  setForm((prev) => {
    const updatedValue = { ...prev, [key]: "" };
    console.log(updatedValue);
    return updatedValue;
  });
}

export function base64Decode(base64Url: string) {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64);
}

export function decodeJwtToken(token: string) {
  if (!token) return;
  const payloadB64 = token.split(".")[1];
  return JSON.parse(base64Decode(payloadB64), (key, value) => {
    if (key === "uid") {
      return BigInt(value).toString();
    }
    return value;
  });
}

export const withOpacity = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function isAxiosError(error: unknown): boolean {
  return axios.isAxiosError(error);
}

export function errorToString(error: unknown, key = "message"): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string") return data;

    if (typeof data === "object" && data !== null) {
      const record = data as Record<string, string>;

      return record[key] || record.message || record.error || error.message;
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
