import { IArray, Theme } from "@/types/global";
import { pipe } from "fp-ts/lib/pipeable";
import { SupportedLanguages, ThemeColor } from "../types/enums";
import { IMAGE_URL_REGEXT } from "./formUtils/validations/ValidationUtils";

type DateString = string | number | Date;

export const removeAt = (
  index: number,
  array: ReadonlyArray<any>,
): ReadonlyArray<any> => array.filter((_, i) => i !== index);

export const getColor = (color: ThemeColor | string, theme: Theme): string => {
  if (color === ThemeColor.Action) return theme.colors.action;
  if (color === ThemeColor.Primary) return theme.colors.primary;
  return color;
};

export const getIdFromName = (name: string | null): string => {
  if (!name) return "";

  return name
    .split(" ")
    .filter((value) => value !== "")
    .map((value, index) => {
      return index === 0
        ? value.toLowerCase()
        : value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    })
    .join("");
};

export const isBrowser = typeof window !== `undefined`;

export const getQueryParams = () =>
  isBrowser && window.location.search
    ? pipe(
        window.location.search
          .substring(1)
          .split("&")
          .map((urlParam) => urlParam.split("=")),
      )
    : [];

export const addLeadingSlashIfNotPresent = (uri: string) =>
  uri.indexOf("/") === 0 ? uri : `/${uri}`;

export const getNumberOfDays = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  return days === 0 ? 1 : days;
};

export const closestInteger = (number: number, divider: number) => {
  const c1 = number - (number % divider);
  const sum = number + divider;
  const c2 = sum - (number % divider);

  if (number - c1 > c2 - number) {
    return c2;
  }
  return c1;
};

export const getTotalPages = (pages: number, itemsPerPage: number) =>
  Math.ceil(pages / itemsPerPage);

export const getNoLineBreakDescription = (description: string) => {
  return description.replace(/(\r\n|\n|\r)/gm, "");
};

export const getTruncationCutWithoutAnchor = ({
  content,
  truncationLength,
}: {
  content: string;
  truncationLength: number;
}) => {
  const firstTruncationVisible = content.substr(0, truncationLength);
  const firstTruncationRest = content.substr(truncationLength);
  const numberOpeningTagsInFirstCut = (
    firstTruncationVisible.match(/<a/g) || []
  ).length;
  const numberOfClosingTagsInFirstCut = (
    firstTruncationVisible.match(/<\/a>/g) || []
  ).length;
  const firstLinkEndsRest = firstTruncationRest.indexOf("</a>");
  const cutIndex =
    numberOpeningTagsInFirstCut === numberOfClosingTagsInFirstCut
      ? truncationLength
      : firstLinkEndsRest + 4 + truncationLength;

  const visibleDescription = content.substr(0, cutIndex);
  const restDescription = content.substr(cutIndex);
  return { visibleDescription, restDescription };
};

export const getUUID = (a = ""): string => {
  const crypto = window.crypto || window.Crypto;
  if (!crypto) {
    throw new Error("Crypto API not available");
  }
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  const bits = buffer.map((x: any) => x.toString(16).padStart(2, "0")).join("");
  return a
    ? `${Number(a).toString(16)}-${bits.substr(0, 8)}-${bits.substr(
        8,
        4,
      )}-${bits.substr(12, 4)}-${bits.substr(16, 12)}`
    : `${bits.substr(0, 8)}-${bits.substr(8, 4)}-${bits.substr(
        12,
        4,
      )}-${bits.substr(16, 4)}-${bits.substr(20, 12)}`;
};

export const partition = <T>(
  array: Array<T>,
  predicate: (elemt: T) => boolean,
): [Array<T>, Array<T>] =>
  array.reduce(
    ([pass, fail], elem) => {
      return predicate(elem)
        ? [[...pass, elem], fail]
        : [pass, [...fail, elem]];
    },
    [[] as Array<T>, [] as Array<T>],
  );

export const removeDuplicates = (array: IArray, uniqueKeyIdentifier: string) =>
  array.filter(
    (currentValue: IArray, index: number, resultArray: IArray) =>
      resultArray.findIndex(
        (testValue: IArray) =>
          testValue[uniqueKeyIdentifier] === currentValue[uniqueKeyIdentifier],
      ) === index,
  );

export const getDuration = (durationInSeconds: number) => {
  const hours = Math.trunc(durationInSeconds / 3600);
  const remainingSeconds = durationInSeconds % 3600;
  const minutes = Math.trunc(remainingSeconds / 60);
  return [hours, minutes];
};

export const getHourDaysMinutesDuration = ({
  durationInSeconds,
}: {
  durationInSeconds: number;
}) => {
  const days = Math.trunc(durationInSeconds / (3600 * 24));
  const remainingSeconds = durationInSeconds % (3600 * 24);
  const [hours, minutes] = getDuration(remainingSeconds);
  return { days, hours, minutes };
};

export const getWithDefault = <T>({
  maybeValue,
  defaultValue,
}: {
  maybeValue?: T;
  defaultValue: T;
}) => maybeValue ?? defaultValue;

export const isInPreviewMode = (ssrCookie?: string) =>
  (typeof document !== "undefined" ? document.cookie : ssrCookie)?.includes(
    "preview=1",
  ) ?? false;

export const getResizeObserver = (
  callback: () => void,
): [ResizeObserver, { rafId?: number }] => {
  const mutableRequestAnimationFrameRef: { rafId?: number } = {
    rafId: undefined,
  };

  const resizeObserver = new ResizeObserver((entries) => {
    // We wrap it in requestAnimationFrame to avoid resize observer loop error
    const rafId = window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) return;
      callback();
    });
    if (mutableRequestAnimationFrameRef) {
      mutableRequestAnimationFrameRef.rafId = rafId;
    }
  });

  return [resizeObserver, mutableRequestAnimationFrameRef];
};

export const isTouchDevice = () =>
  isBrowser && window.matchMedia("(pointer: coarse)").matches;

export const normalizeGraphCMSLocale = (activeLocale: string) =>
  activeLocale === SupportedLanguages.Chinese
    ? SupportedLanguages.LegacyChinese
    : activeLocale;

const commonEntities = {
  lt: "<",
  gt: ">",
  sol: "/",
  quot: '"',
  apos: "'",
  amp: "&",
  copy: "©",
  reg: "®",
  deg: "°",
  laquo: "«",
  raquo: "»",
  nbsp: " ",
  trade: `™`,
  hellip: `…`,
  mdash: `—`,
  bull: `•`,
  ldquo: `“`,
  rdquo: `”`,
  lsquo: `‘`,
  rsquo: `’`,
  larr: `←`,
  rarr: `→`,
  darr: `↓`,
  uarr: `↑`,
};

export const decodeHtmlEntity = (str: string) => {
  return str
    .replace(/&#(\d+);/g, (_match: string, dec: number) => {
      return String.fromCharCode(dec);
    })
    .replace(
      new RegExp(`&(${Object.keys(commonEntities).join("|")});`, "g"),
      (_match: string, entity: keyof typeof commonEntities) => {
        return commonEntities[entity];
      },
    );
};

export const decodeHTMLTitle = (title: string | undefined) => {
  // eslint-disable-next-line prefer-regex-literals
  const specialCharRegex = new RegExp(/[#&;]/);
  if (title && specialCharRegex.test(title)) return decodeHtmlEntity(title);
  return title;
};

export const getHttpsUrl = (url?: string) =>
  url?.replace(/^http:\/\//i, "https://");

export const removeTrailingCommas = (text: string) => {
  return text.replace(/,\s*$/, "");
};

export const formatNumericValueToHumanReadable = (
  value: string | number,
): string | number => {
  return String(value).match(/^\d{5,}$/)
    ? Number(value).toLocaleString()
    : value;
};

export const decodeJwtResponse = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        const hex = c.charCodeAt(0).toString(16);
        return "%" + (hex.length === 1 ? "0" + hex : hex);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export const isAlphabetic = (str: string) =>
  typeof str === "string" ? /^[a-zA-Z]+$/.test(str) : false;

export const isNullOrUndefined = (obj?: unknown) => obj == null;

/**
 * removeHTMLCharactersFromText only works in CSR
 */
export const removeHTMLCharactersFromText = (str?: string) => {
  if (str && isBrowser) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || str;
  }
  return str;
};

export const getLastIndex = <T>(arr: T[]): number => {
  return arr.length - 1;
};
export const checkEmptydataArray = (arr: any[]) => {
  return arr?.every((item) => !item.dealdata.length);
};

export const getStages = (length: number, array: any[]) => {
  let stageName = "";
  array?.forEach((item: { id: string }, index: number) => {
    if (index === length - 1) {
      stageName = item.id;
    }
  });
  return stageName;
};

export const disablePastDates = () => {
  return new Date()?.toISOString()?.split("T")[0];
};

export const copyToClipboard = (value: string) => {
  return navigator.clipboard.writeText(value);
};
export const openToNewTab = (Taburl: string, type: string) => {
  if (!Taburl) {
    return;
  }
  const openInNewTab = (NeTaburl: string) => {
    window.open(NeTaburl, "_blank");
  };
  switch (type) {
    case "email":
      return openInNewTab(`mailto:${Taburl}`);
    case "phone":
      return openInNewTab(`tel:${Taburl}`);
    default:
      return openInNewTab(Taburl);
  }
};

export const formatDate = (dateString: DateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
};

export const dateHandler = (selectedOption: string) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = date.getDate().toString().padStart(2, "0");
  const startdate = `${formattedMonth}/${formattedDay}/${year}`;
  const lastDay = new Date(year, month, 0).getDate();
  let startDateInput: string = "";
  let endDateInput: string = "";
  if (selectedOption) {
    if (selectedOption === "Current month") {
      startDateInput = `${formattedMonth}/01/${year}`;
      endDateInput = startdate;
    } else if (selectedOption === "Last month") {
      const prevMonth = (month - 1).toString().padStart(2, "0");
      startDateInput = `${prevMonth}/01/${year}`;
      endDateInput = `${prevMonth}/${lastDay}/${year}`;
    } else if (selectedOption === "Last year") {
      startDateInput = `01/01/${year - 1}`;
      endDateInput = `12/31/${year - 1}`;
    } else if (selectedOption === "Historical") {
      startDateInput = `01/01/2000`;
      endDateInput = `01/01/${year - 1}`;
    } else if (selectedOption === "Last quarter") {
      let lastQuarterStartMonth = ((month - 1) / 3) * 3;
      lastQuarterStartMonth = lastQuarterStartMonth - 2;
      const lastQuarterStartFormattedMonth = lastQuarterStartMonth
        .toString()
        .padStart(2, "0");
      const lastQuarterEndMonth = lastQuarterStartMonth + 2;
      const lastQuarterEndFormattedMonth = lastQuarterEndMonth
        .toString()
        .padStart(2, "0");
      startDateInput = `${lastQuarterStartFormattedMonth}/01/${year}`;
      endDateInput = `${lastQuarterEndFormattedMonth}/${lastDay}/${year}`;
    }
  }
  return { startDateInput, endDateInput };
};

export function isValidImageUrl(url: string) {
  const pattern = IMAGE_URL_REGEXT;
  return pattern.test(url);
}

export const keyType = {
  ENTER_KEY: "Enter",
  E_KEY: "e" || "E",
  DOT_KEY: ".",
  LEFT: 0,
  RIGHT: 2,
};

export const getSymbol = (valueType: string) => {
  if (valueType === "US Dollar (USD)") {
    return "$";
  } else if (valueType === "Euro (EUR)") {
    return "€";
  }
  return "£";
};

export const formatedValues = (value: string) => {
  const price = Number(value);
  return price ? price.toFixed(2) : value;
};

export const truncateWords = (sentence: string, amount: number) => {
  if (sentence?.length > amount) {
    return `${sentence?.slice(0, amount)}...`;
  }
  return sentence;
};

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const weekDayName = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const timeZone = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

export function formatDateRange(dateRange: {
  from: DateString;
  to: DateString;
}) {
  const fromDate = new Date(dateRange.from);
  const toDate = new Date(dateRange.to);
  const formattedFrom = `${fromDate.getDate()} ${
    monthNames[fromDate.getMonth()]
  } -`;
  const formattedTo = `${toDate.getDate()} ${monthNames[toDate.getMonth()]}`;
  return `${formattedFrom} ${formattedTo}`;
}

export function getDateWithMonth(date: Date) {
  if (!date) {
    return;
  }
  return `${date?.getDate()} ${monthNames[date?.getMonth()]}`;
}

export const getCurrentMonthDates = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const datesArray = [];
  for (
    let currentDate = firstDayOfMonth;
    currentDate <= lastDayOfMonth;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    datesArray.push(new Date(currentDate));
  }
  return datesArray;
};

export const getCurrentWeekDates = () => {
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay(),
  );
  const endOfWeek = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 6,
  );

  return {
    from: startOfWeek,
    to: endOfWeek,
  };
};

export function isCurrentDate(dateString: DateString) {
  const date = new Date(dateString);
  const currentDate = new Date();

  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate()
  );
}

export function isFutureDate(dateString: Date) {
  const date = new Date(dateString);
  const now = new Date();
  return isCurrentDate(date) || date.getTime() > now.getTime() ? true : false;
}

export const allRoutes = [
  {
    route: "/schedulePost",
    title: "Schedule posts",
  },
  {
    route: "/deals",
    title: "Deals",
  },
  {
    route: "/accelerator",
    title: "Accelerator",
  },
  {
    route: "/integrations",
    title: "Integrations",
  },
  {
    route: "/gems",
    title: "Gems",
  },
];
export function removePreviewUrl(
  arr: Array<{ file: File; previewUrl: string }>,
) {
  return arr.map((obj) => {
    const { previewUrl, ...rest } = obj;
    return rest;
  });
}

export function getDate(dateString: DateString, dateString2: DateString) {
  return formatDate(dateString) === formatDate(dateString2);
}

export const findTime = (exTime: string) => {
  const time2 = exTime.split(":");
  return timeZone.find((time) => {
    const time1 = time.split(":");
    return Number(time2[0]) === Number(time1[0]);
  });
};

export const listData = (
  listArray: { fullName: string; id: string; profilePicture: string | null }[],
) => {
  if (!listArray) {
    return [];
  }
  return listArray.map(({ fullName, id, profilePicture }) => ({
    title: fullName,
    icon: profilePicture,
    id,
  }));
};
