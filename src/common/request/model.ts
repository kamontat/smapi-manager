import { ClientRequest, net } from "electron";
import ProcessorType from "@common/constants/processor-type";
import { Logger } from "@common/logger";

interface Response<H, T> {
  headers: H;
  json: T;
}

class Request {
  private logger: Logger;
  private requester: ClientRequest;
  private hostname: string;
  private path: string;
  constructor(hostname: string, path: string) {
    this.hostname = hostname;
    this.path = path;

    this.logger = new Logger(ProcessorType.COMMON, "request");
    this.requester = net.request({
      method: "GET",
      protocol: "https:",
      hostname: hostname,
      port: 443,
      path,
    });
  }

  setHeader(name: string, value: string): this {
    this.requester.setHeader(name, value);
    return this;
  }

  request<H, T>(): Promise<Response<H, T>> {
    return new Promise<Response<H, T>>((res, rej) => {
      this.requester.on("response", response => {
        this.logger.debug(`response from ${this.hostname}${this.path} (${response.statusCode})`);

        let data = "";
        response.on("data", (chunk: Buffer) => {
          data += chunk.toString("utf-8");
        });

        response.on("end", () => {
          res({ headers: (response.headers as unknown) as H, json: JSON.parse(data) });
        });

        response.on("error", (error: Error) => {
          this.logger.debug(`error occurred`);
          rej(error);
        });
      });

      this.requester.end();
    });
  }
}

export default Request;
