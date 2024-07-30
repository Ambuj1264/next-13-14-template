/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactElement } from "react";

// Ensure this is treated as a module. Otherwise declaration global won't work for window object
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
// https://github.com/microsoft/TypeScript/issues/19816#issuecomment-640263670
export {};

declare global {
  interface Window {
    dataLayer: any[];
    google: any;
    initMap: () => void;
    BMapLib: any;
    ga: any;
    convert: {
      currentData: {
        experiments: {
          [key: string]: Experiment;
        };
      };
    };
    onUsersnapLoad: (api: any) => void;
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
    __NEXT_DATA__: any;
    lazySizesConfig: any;
    Cookiebot: any;
    CookieConsent: any;
    handleGTECredentialResponse: (response: any) => void;
    _travelshift: any;
  }

  interface Document {
    selection: any;
  }

  type LocaleLink = {
    locale: string;
    uri: string;
  };

  type QueryImage = Readonly<{
    id: number | string;
    url: string;
    name?: string;
    alt?: string;
  }>;

  type Image = Readonly<{
    id: string;
    url: string;
    alt?: string | undefined;
    name?: string;
    isDefaultImage?: boolean;
  }>;
  type ImageWithSizes = Image & { width?: number; height?: number };

  type QueryUserRole = {
    id: string;
  };

  type QueryUser = Readonly<{
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatarImage?: QueryImage;
    roles: QueryUserRole[];
    countryCode: string;
  }>;

  type User = Readonly<{
    id: number;
    name: string;
    email: string;
    phone?: string;
    countryCode: string;
    avatarImage?: Image;
    isAdmin: boolean;
    isTranslator: boolean;
    isAffiliate: boolean;
  }>;

  type QueryActiveUserData = Readonly<{
    activeUser?: QueryUser;
    cartItemCount?: number;
  }>;

  type ActiveGTEUserQuery = Readonly<{
    userProfile: {
      name: string;
      email: string;
      phone?: string;
      picture: string;
      imageHandle: string;
    };
  }>;

  type Color = import("./enums").ThemeColor | string;

  type SelectOption = Readonly<{
    value?: string;
    nativeLabel?: string;
    label?: React.ReactElement | string;
    isDisabled?: boolean;
    Icon?: React.ElementType;
  }>;

  type SelectComponents = Readonly<{
    DropdownIndicator?: Readonly<{
      option: SelectOption;
    }>;
    SingleValue?: Readonly<{
      option: SelectOption;
    }>;
    Option?: ReactElement;
    ValueContainer?: ReactElement;
  }>;

  type Theme = {
    colors: {
      primary: string;
      action: string;
    };
  };

  type Currency = Readonly<{
    currencyCode: string;
    name: string;
    rate: number;
  }>;

  type AppLocale = Readonly<{
    code: string;
    name: string;
  }>;

  type MutationStatus = "none" | "loading" | "error" | "success";

  interface ParsedUrlQuery {
    [key: string]: string | string[];
  }

  type QueryCalulatePriceData = {
    prices: {
      totalPrice: string;
      fullPrice: string;
      discountPrice: string;
      cancellationPolicy: string;
    };
  };

  type Query = {
    query: any;
    variables: { slug?: string; locale?: string; type?: string };
  };

  type QueryWeather = {
    getWeather: {
      id: string;
      attractionId: string;
      conditionCode: string;
      conditionText: string;
      date: string;
      cityName: string;
      countryName: string;
      lowTemperatureCelsius: string;
      highTemperatureCelsius: string;
      lowTemperatureFahrenheit: string;
      highTemperatureFahrenheit: string;
      updatedTime: string;
    };
  };

  type Hreflang = {
    locale: string;
    uri: string;
  };

  type PageMetadata = {
    pageMetadata: {
      title: string;
      description?: string;
      isIndexed: boolean;
      hreflangs: Hreflang[];
      ogImage: QueryImage;
      facebookLikeUrl?: string | null;
    };
  };

  type GenericObject = { [key: string]: any };
  type ReactSlickInner = any;
}
