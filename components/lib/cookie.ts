import { Component } from "react";
import Cookies from "js-cookie";

export default class CookieProvider extends Component {
  static setCookie(
    key: string,
    value: string,
    options?: Cookies.CookieAttributes | undefined
  ): void {
    Cookies.set(key, value, options);
  }

  static getCookie(key: string): string | undefined {
    return Cookies.get(key);
  }

  static deleteCookie(key: string): boolean {
    if (Cookies.get(key)) {
      Cookies.remove(key);
      return true;
    }
    return false;
  }
}
