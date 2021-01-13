import React, { useEffect } from "react";

import { getWindowName } from "@common/constants/name";

import Header from "@components/Header";

interface ModManagerProperty {
  name: string;
}

const ModManager = ({ name }: ModManagerProperty): JSX.Element => {
  useEffect(() => {
    document.title = getWindowName(name);
  }, []);

  return (
    <div>
      <Header name={name}></Header>
      <div>mod manager</div>
    </div>
  );
};

export default ModManager;
