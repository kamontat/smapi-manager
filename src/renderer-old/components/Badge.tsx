import tw from "twin.macro";

const Badge = tw.span`
  px-2 inline-flex text-xs leading-5 font-semibold rounded-full
`;

const InfoBadge = tw(Badge)`bg-green-100 text-green-800`;
const WarnBadge = tw(Badge)`bg-red-100 text-red-800`;

export default Badge;
export { InfoBadge, WarnBadge };
