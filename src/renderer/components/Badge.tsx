import tw from "twin.macro";

const Badge = tw.span`
  text-xs leading-5 rounded-full cursor-default
  px-2 md:px-4 py-1
`;

const BadgeContainer = tw.div`
  flex space-x-3 mt-3 mb-2
`;

const InfoBadge = tw(Badge)`bg-green-200 text-green-800`;
const MessageBadge = tw(Badge)`bg-blue-200 text-blue-800`;
const WarnBadge = tw(Badge)`bg-red-200 text-red-800`;

export default BadgeContainer;
export { Badge, MessageBadge, InfoBadge, WarnBadge };
