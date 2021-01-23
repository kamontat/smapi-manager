import React from "react";
import "twin.macro";

interface TitleProperty {
  title: string;
}

const Title = ({ title }: TitleProperty): JSX.Element => {
  return <h1 tw="text-left">{title}</h1>;
};

export default Title;
