import React from "react";
import tw from "twin.macro";

interface TextWithTooltipProperty {
  text: string;
  tooltip?: string;
  onClick?: () => void;
}

const Container = tw.div`relative inline-block w-full`;
const Title = tw.h2`
  cursor-pointer
  text-gray-700 font-bold text-lg
`;

const TooltopContainer = tw.div`
  absolute z-10 bottom-full
  py-2 ml-14 px-3

  opacity-0 hover:opacity-100 group-hover:opacity-100
  bg-black text-white
  text-center text-xs
  rounded-lg pointer-events-none

  transition-opacity duration-300 ease-in-out
`;

const TextWithTooltip = ({ text, tooltip, onClick }: TextWithTooltipProperty): JSX.Element => {
  const base = [];
  if (onClick) base.push(tw`hover:underline`);

  return (
    <Container className="group">
      <Title onClick={onClick} css={base}>
        {text}
      </Title>
      {tooltip && (
        <TooltopContainer>
          {tooltip}
          <svg tw="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
            <polygon tw="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </TooltopContainer>
      )}
    </Container>
  );
};

export default TextWithTooltip;
