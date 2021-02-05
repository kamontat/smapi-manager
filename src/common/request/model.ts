import { ClientRequest, net } from "electron";
import { Logger } from "@common/logger";

interface Response<C extends number = number, H = unknown, T = unknown> {
  code: C;
  headers: H;
  json: T;
}

const logger = Logger.Common("request");
class Request {
  private requester: ClientRequest;
  private hostname: string;
  private path: string;
  constructor(hostname: string, path: string) {
    this.hostname = hostname;
    this.path = path;

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

  request<R extends Response>(): Promise<R> {
    return new Promise<R>((res, rej) => {
      this.requester.on("response", response => {
        logger.debug(`response from ${this.hostname}${this.path} (${response.statusCode})`);

        let data = "";
        response.on("data", (chunk: Buffer) => {
          data += chunk.toString("utf-8");
        });

        response.on("end", () => {
          res({ code: response.statusCode, headers: response.headers as unknown, json: JSON.parse(data) } as R);
        });

        response.on("error", (error: Error) => {
          logger.debug(`error occurred`);
          rej(error);
        });
      });

      this.requester.end();
    });
  }
}

export default Request;
export type { Response };
