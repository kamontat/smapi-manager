import React, { PropsWithChildren } from "react";
import tw from "twin.macro";
import { useHistory } from "react-router";

interface RawLinkProperty {
  onClick: () => void;
}

const A = tw.a`cursor-pointer`;

const RawLink = ({ children, onClick }: PropsWithChildren<RawLinkProperty>): JSX.Element => {
  return <A onClick={onClick}>{children}</A>;
};

interface LinkProperty {
  to: string;
}

const Link = ({ to, children }: PropsWithChildren<LinkProperty>): JSX.Element => {
  const history = useHistory();
  return <RawLink onClick={() => history.push(to)}>{children}</RawLink>;
};

const Back = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  const history = useHistory();
  return <RawLink onClick={() => history.replace("/")}>{children}</RawLink>;
};

const BackText = (): JSX.Element => <span tw="text-white">Back</span>;

export default Link;
export { LinkProperty, Back, BackText };
