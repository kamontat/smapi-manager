import { writable, Writable } from "svelte/store";

enum NotificationType {
  EMPTY = "empty",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

interface NotificationOption {
  showTime: number;
}

interface NotificationMessage {
  type: NotificationType;
  message: string;
  option: NotificationOption;
}

const optionWrapper = (opt?: Partial<NotificationOption>): NotificationOption => {
  return {
    showTime: opt?.showTime ?? 5000,
  };
};

const empty = (): NotificationMessage => ({
  type: NotificationType.EMPTY,
  message: "",
  option: optionWrapper(),
});

const notification: Writable<NotificationMessage> = writable(empty());

type Callback<O> = (input: NotificationMessage) => O;

type ErrorParam = string | Error;
type InfoParam = string;

const reset = (): void => notification.set(empty());

const showMessage = (param: InfoParam | Callback<InfoParam>, opt?: Partial<NotificationOption>): void => {
  notification.update(noti => {
    const params = typeof param === "function" ? param(noti) : param;

    return {
      type: NotificationType.INFO,
      message: params,
      option: optionWrapper(opt),
    };
  });
};

const showWarn = (param: ErrorParam | Callback<ErrorParam>, opt?: Partial<NotificationOption>): void => {
  notification.update(noti => {
    const params = typeof param === "function" ? param(noti) : param;
    const message = typeof params === "string" ? params : params.message;

    return {
      type: NotificationType.WARN,
      message,
      option: optionWrapper(opt),
    };
  });
};

const showError = (param: ErrorParam | Callback<ErrorParam>, opt?: Partial<NotificationOption>): void => {
  notification.update(noti => {
    const params = typeof param === "function" ? param(noti) : param;
    const message = typeof params === "string" ? params : params.message;

    return {
      type: NotificationType.ERROR,
      message,
      option: optionWrapper(opt),
    };
  });
};

type Checker = (m: NotificationMessage) => boolean;

const isPermanentMessage: Checker = msg => msg.option.showTime < 0;

const isEmpty: Checker = msg => msg.type === NotificationType.EMPTY;
const nonEmpty: Checker = msg => msg.type !== NotificationType.EMPTY;

const isWarn: Checker = msg => msg.type === NotificationType.WARN;
const isError: Checker = msg => msg.type === NotificationType.ERROR;
const isInfo: Checker = msg => msg.type === NotificationType.INFO;

export default notification;
export { reset, showMessage, showWarn, showError };
export { isPermanentMessage, isEmpty, nonEmpty, isError, isWarn, isInfo };
