import React, { useEffect, useState } from "react";
import { ProcessMetric } from "electron";
import tw from "twin.macro";

import { APP_INFO, APP_METRICS, ELECTRON_INFO } from "@common/constants/events";
import ProcessorType from "@common/constants/processor-type";
import { AppInfo, defaultAppInfo, ElectronInfo, defaultElectronInfo } from "@common/models";
import Message from "@common/message";

import Header from "@components/Header";
import { getWindowName } from "@common/utils/window";
import Logger from "@common/logger";

const Container = tw.div`
  flex flex-col h-full
  bg-gradient-to-br from-yellow-400 to-red-500
`;

const DataContainer = tw.div`
  shadow overflow-x-hidden overflow-y-scroll sm:rounded-lg
  mx-3 my-2 bg-white
`;

const DataHeader = tw.div`px-4 py-5 sm:px-6`;
const DataHeaderTitle = tw.h1`text-lg leading-6 text-gray-900`;
const DataHeaderSubTitle = tw.h2`text-sm mt-1 max-w-2xl text-gray-500`;

const DataBodyContainer = tw.div`border-t border-gray-100`;
const DataBody = tw.dl``;
const DataBodyElementA = tw.div`px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6`;
const DataBodyElementB = tw(DataBodyElementA)`bg-gray-200`;
const DataBodyElementTitle = tw.div`text-sm text-gray-500`;
const DataBodyElementDescription = tw.div`mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2`;

interface AppInfoProperty {
  name: string;
}

const logger = new Logger(ProcessorType.RENDERER, "app-info");
const message = new Message(ProcessorType.RENDERER);
const AppInfoPage = ({ name }: AppInfoProperty): JSX.Element => {
  const [appInfo, setAppInfo] = useState(defaultAppInfo);
  const [electronInfo, setElectronInfo] = useState(defaultElectronInfo);
  const [appMetrics, setAppMetrics] = useState<ProcessMetric[]>([]);

  useEffect(() => {
    document.title = getWindowName(name);

    message.sent({ type: APP_INFO });
    message.sent({ type: ELECTRON_INFO });

    message.receive<AppInfo>({
      type: [APP_INFO],
      callback: data => {
        data.log(logger);
        setAppInfo(data.value);
      },
    });

    message.receive<ElectronInfo>({
      type: [ELECTRON_INFO],
      callback: data => {
        data.log(logger);
        setElectronInfo(data.value);
      },
    });

    message.receive<ProcessMetric[]>({
      type: [APP_METRICS],
      callback: data => {
        data.log(logger);
        setAppMetrics(data.value);
      },
    });

    return message.cleanup();
  }, []);

  const data = [
    {
      name: "Environment",
      value: appInfo.env,
    },
    {
      name: "Name",
      value: appInfo.name,
    },
    {
      name: "Version",
      value: `${appInfo.version}${appInfo.build ? ` (${appInfo.build})` : ""}`,
    },
    {
      name: "Electron version",
      value: electronInfo.version,
    },
    {
      name: "Chrome version",
      value: electronInfo.chrome,
    },
    {
      name: "Path",
      value: appInfo.path,
    },
    {
      name: "OS",
      value: appInfo.os,
    },
  ].filter(d => !!d.value);

  const metrics = appMetrics.reduce((p, c) => {
    return p.concat(
      {
        name: `CPU (${c.pid} ${c.type})`,
        value: c.cpu.percentCPUUsage.toFixed(3),
      },
      {
        name: `Memory (${c.pid} ${c.type})`,
        value: c.memory.workingSetSize,
      }
    );
  }, []);
  data.push(...metrics);

  return (
    <Container>
      <Header name={name}></Header>
      <DataContainer>
        <DataHeader>
          <DataHeaderTitle>Application information</DataHeaderTitle>
          <DataHeaderSubTitle>This shown all information relate to application</DataHeaderSubTitle>
        </DataHeader>
        <DataBodyContainer>
          <DataBody>
            {data.map((d, i) => {
              const Parent = i % 2 === 0 ? DataBodyElementB : DataBodyElementA;
              return (
                <Parent key={d.name}>
                  <DataBodyElementTitle>{d.name}</DataBodyElementTitle>
                  <DataBodyElementDescription>{d.value}</DataBodyElementDescription>
                </Parent>
              );
            })}
          </DataBody>
        </DataBodyContainer>
      </DataContainer>
    </Container>
  );
};

export default AppInfoPage;
