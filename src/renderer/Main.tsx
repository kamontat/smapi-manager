import React, { useState } from "react";
import "twin.macro";

const Main = (): JSX.Element => {
  const mapper = {
    first: <span>first page</span>,
    second: <span>second page</span>,
  };

  type Mapper = typeof mapper;

  const [name, setName] = useState("first" as keyof Mapper);

  const switchPage = (name: keyof Mapper) => {
    return () => setName(name);
  };

  return (
    <div tw="flex h-full min-h-screen">
      <nav tw="w-1/3">
        <div>
          <button onClick={switchPage("first")}>first</button>
        </div>
        <div>
          <button onClick={switchPage("second")}>second</button>
        </div>
      </nav>
      <div tw="w-2/3">{mapper[name]}</div>
    </div>
  );
};

export default Main;
