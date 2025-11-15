import { decodeJwtToken } from "../helper/helper";
import { AuthToken, MetaData } from "../types/types";

export class JWTProvider {
  private static accessToken?: AuthToken;
  private static metaData: MetaData;
  private static updateMetadata(authToken: string) {
    if (this.accessToken && authToken) {
      this.metaData = {
        Authorization: `Bearer ${authToken}`,
      };
    }
  }

  static set token(value: AuthToken | undefined) {
    this.accessToken = value;
  }

  static get token(): AuthToken | undefined {
    return this.accessToken;
  }

  static set metadata(value: MetaData) {
    this.metaData = value;
  }

  static get metadata(): MetaData {
    return this.metaData;
  }

  static decode<T>(value: string): T | undefined {
    try {
      return decodeJwtToken(value || "");
    } catch (error) {
      console.error("Failed to decode token:", error);
      return undefined;
    }
  }

  static decodeAndSetToken(value: string): boolean {
    const decodedToken = this.decode<AuthToken>(value);
    console.log("decoded token", decodedToken);
    if (decodedToken) {
      this.token = {
        ...decodedToken,
      };
      this.updateMetadata(value);
      return true;
    }
    return false;
  }

  static clearToken() {
    this.token = undefined;
  }
}
