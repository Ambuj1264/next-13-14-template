// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace SharedTypes {
  /**
   * Overrides existing properties in type T1 in favor of those passed in T2.
   */
  export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

  type Only<T1, T2> = {
    [K in keyof T1]: T1[K];
  } & {
    [K in keyof T2]?: never;
  };

  /**
   * Results in a type with either the properties of T1 or those in type T2.
   */
  export type Either<T1, T2> = Only<T1, T2> | Only<T2, T1>;

  type Paragraph = Readonly<{
    text: string;
    accumulatedLength: number;
  }>;

  type QueryItem = {
    id: number;
    name: string;
    included?: boolean;
  };

  type TranslationKey = {
    key: string;
    options?: {
      [key: string]: string | number;
    };
  };

  type ItemFact = {
    id: string;
    label: string;
    value: string | TranslationKey;
    translateValue?: boolean;
  };

  type Metadata = {
    title: string;
    description: string;
    facebookLikeUrl?: string;
    canonicalUrl?: string;
  };

  type BreadcrumbData = {
    name: string;
    url: string;
  };

  export type QuerySearchMetadata = {
    title: string;
    subtitle: string;
  };

  export type PartialLoading = {
    allProvidersLoading: boolean;
    someProviderLoading: boolean;
  };

  export type OrderDirection = "asc" | "desc";

  export type ResponsiveThumbnails = {
    medium: number;
    large: number;
    desktop: number;
  };

  export type Time = {
    hour: number;
    minute: number;
  };

  type ColumnSizes = {
    small: number;
    medium?: number;
    large?: number;
    desktop?: number;
    print?: number;
  };

  type ImgixParams = {
    w?: number;
    h?: number;
    crop?: string;
    ar?: string;
    fit?: string;
    "min-w"?: number;
    fill?: string;
    auto?: string;
    q?: number;
    blur?: number;
    pad?: number;
    "fp-z"?: number;
    bg?: string;
    fm?: string;
  };

  type DevicePixelRatio = 1 | 2 | 3 | 4 | 5 | number;

  type VariableQualities = { [key in DevicePixelRatio]?: number };

  type ImgixSrcSetOptions = {
    widths?: number[];
    widthTolerance?: number;
    minWidth?: number;
    maxWidth?: number;
    disableVariableQuality?: boolean;
    devicePixelRatios?: DevicePixelRatio[];
    variableQualities?: VariableQualities;
    disablePathEncoding?: boolean;
  };

  type ImgixProps = {
    disableSrcSet?: boolean;
    className?: string;
    src: string;
    sizes?: string;
    attributeConfig?: any;
    htmlAttributes?: any;
    width?: number;
    height?: number;
    imgixParams?: any;
    disableLibraryParam?: boolean;
    title?: string;
    srcSetOptions?: ImgixSrcSetOptions;
  };

  export type Author = {
    id: number;
    name: string;
    image: {
      id: string;
      url: string;
    };
  };

  type Birthdate = {
    day?: string;
    month?: string;
    year?: string;
  };

  type Country = {
    name: string;
    callingCode: number;
    countryCode: string;
    flagSvgUrl: string;
  };

  type Columns = {
    small?: number;
    medium?: number;
    large?: number;
    desktop?: number;
    print?: number;
  };
}
