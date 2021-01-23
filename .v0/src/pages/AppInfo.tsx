import React, { useEffect, useState } from "react";
import { ProcessMetric } from "electron";
import tw from "twin.macro";

import ProcessorType from "@common/constants/processor-type";
import { Message, APP_INFO, APP_METRICS, ELECTRON_INFO, READ_CONFIG } from "@common/event";
import { AppInfo, defaultAppInfo, ElectronInfo, defaultElectronInfo } from "@common/application";
import { Logger } from "@common/logger";

import Header from "@components/Header";

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

type DataObj = { name: string; value: string | number };
class Data {
  private array: DataObj[];
  constructor() {
    this.array = new Array<DataObj>();
  }

  add(name: string, value?: string | number | null): this {
    if (value !== undefined && value !== null) {
      this.array.push({ name, value });
    }
    return this;
  }

  addIf(condition: boolean, name: string, value?: string | number | null): this {
    if (condition) return this.add(name, value);
    return this;
  }

  toArray() {
    return this.array;
  }
}

const logger = new Logger(ProcessorType.RENDERER, "app-info");
const message = new Message(ProcessorType.RENDERER);
const AppInfoPage = ({ name }: AppInfoProperty): JSX.Element => {
  const [debugMode, setDebug] = useState(false);
  const [appInfo, setAppInfo] = useState(defaultAppInfo);
  const [electronInfo, setElectronInfo] = useState(defaultElectronInfo);
  const [appMetrics, setAppMetrics] = useState<ProcessMetric[]>([]);

  useEffect(() => {
    message.sent({ type: APP_INFO });
    message.sent({ type: ELECTRON_INFO });

    message.readConfig("debugMode");
    message.receive<boolean>({
      type: [READ_CONFIG],
      subtype: ["debugMode"],
      callback: data => setDebug(data.value),
    });

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
  }, [] as DataObj[]);

  const data = new Data();
  data
    .addIf(debugMode, "Environment", appInfo.env)
    .add("Name", appInfo.name)
    .add("Version", `${appInfo.version} (${appInfo.build})`)
    .add("Author", appInfo.author.name)
    .add("Author email", appInfo.author.email)
    .addIf(debugMode, "Electron version", electronInfo.version)
    .addIf(debugMode, "Chrome version", electronInfo.chrome)
    .addIf(debugMode, "Application", appInfo.path.app)
    .addIf(debugMode, "Application data", appInfo.path.data)
    .addIf(debugMode, "Log", appInfo.path.log)
    .addIf(debugMode, "Temp", appInfo.path.temp)
    .addIf(debugMode, "OS", appInfo.os);

  metrics.forEach(m => data.add(m.name, m.value));

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
            {data.toArray().map((d, i) => {
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
