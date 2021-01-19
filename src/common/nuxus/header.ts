interface Header {
  ["userid"]: string;
  ["x-rl-hourly-limit"]: string;
  ["x-rl-hourly-remaining"]: string;
  ["x-rl-hourly-reset"]: string;

  ["x-rl-daily-limit"]: string;
  ["x-rl-daily-remaining"]: string;
  ["x-rl-daily-reset"]: string;
}

export default Header;
