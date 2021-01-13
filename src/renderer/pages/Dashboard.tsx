import React, { useEffect } from "react";
import { useHistory } from "react-router";
import tw from "twin.macro";

import { getWindowName } from "@common/constants/name";

import allPages from "../src/pages";

const Container = tw.div`
  h-full p-4
  grid grid-cols-5 grid-rows-3 gap-x-8 gap-y-4 grid-cols-3
  bg-gradient-to-br from-yellow-500 via-green-500 to-blue-500
`;

const CardContainer = tw.div`
  flex justify-center items-center
`;

const Card = tw.div`
  flex justify-center items-center
  p-3 min-w-card min-h-card max-w-card max-h-card
  bg-white border rounded-xl shadow-md
  cursor-pointer
  hover:shadow-xl hover:text-red-200
`;

interface DashboardProperty {
  name: string;
}

const Dashboard = ({ name }: DashboardProperty): JSX.Element => {
  useEffect(() => {
    document.title = getWindowName(name);
  }, []);

  const history = useHistory();
  const pages = allPages.filter(p => p.key !== "dashboard");
  return (
    <Container>
      {pages.map(p => {
        return (
          <CardContainer key={p.key}>
            <Card onClick={() => history.push(p.path)}>
              <span>{p.name}</span>
            </Card>
          </CardContainer>
        );
      })}
    </Container>
  );
};

export default Dashboard;
