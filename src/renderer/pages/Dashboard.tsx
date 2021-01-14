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

  transition transform duration-300 ease-in-out

  hover:shadow-xl hover:-translate-y-1 hover:scale-110
`;

interface DashboardProperty {
  name: string;
}

const Dashboard = ({ name }: DashboardProperty): JSX.Element => {
  useEffect(() => {
    document.title = getWindowName(name);
  }, []);

  const history = useHistory();
  const pages = Object.keys(allPages).filter(key => key !== "dashboard");
  return (
    <Container>
      {pages.map(key => {
        const page = allPages[key as keyof typeof allPages];
        return (
          <CardContainer key={key}>
            <Card onClick={() => history.push(page.path)}>
              <span>{page.name}</span>
            </Card>
          </CardContainer>
        );
      })}
    </Container>
  );
};

export default Dashboard;
