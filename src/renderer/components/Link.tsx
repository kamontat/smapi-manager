import React, { PropsWithChildren } from "react";
import { useHistory } from "react-router";

interface RawLinkProperty {
  onClick: () => void;
}

const RawLink = ({ children, onClick }: PropsWithChildren<RawLinkProperty>): JSX.Element => {
  return <a onClick={onClick}>{children}</a>;
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
  return <RawLink onClick={() => history.goBack()}>{children}</RawLink>;
};

export default Link;
export { LinkProperty, Back };
