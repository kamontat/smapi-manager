import { writable, Writable } from "svelte/store";

interface Mode {
  debug: boolean;
  tutorial: boolean;
  beta: boolean;
}

const mode: Writable<Mode> = writable({
  debug: false,
  tutorial: false,
  beta: false,
});

const updateMode = (key: keyof Mode, value: boolean): void => {
  mode.update(m => Object.assign({}, m, { [key]: value }));
};

export default mode;
export { updateMode };
