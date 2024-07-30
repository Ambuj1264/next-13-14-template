export const setCookie = (
  name: string,
  value: string | boolean,
  days: number,
) => {
  const SECONDS_IN_DAY = 24 * 60 * 60;
  const MILLISECONDS_IN_SECOND = 1000;
  const TOTAL_TIME = days * SECONDS_IN_DAY * MILLISECONDS_IN_SECOND;
  const expires = new Date(Date.now() + TOTAL_TIME).toUTCString();

  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};
