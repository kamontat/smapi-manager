interface Header {
  ["x-ratelimit-limit"]: number;
  ["x-ratelimit-remaining"]: number;
  ["x-ratelimit-reset"]: number;
  ["x-ratelimit-used"]: number;
}

export default Header;
