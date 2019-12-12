const buildMakeSource = ({ isValidIp }) => ({ ip, browser, referrer } = {}) => {
  if (!ip) {
    throw new Error("User source must contain an ip");
  }

  if (!isValidIp(ip)) {
    throw new RangeError("User source must contain a valid ip");
  }

  return Object.freeze({
    getIp: () => ip,
    getBrowser: () => browser,
    getReferrer: () => referrer,
  });
};

export default buildMakeSource;
