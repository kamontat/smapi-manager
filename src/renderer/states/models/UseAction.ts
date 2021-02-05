type UseActionReturn<P> = {
  update?: (parameters: P) => void;
  destroy?: () => void;
};

type UseAction<P> = (node: HTMLElement, parameters: P) => UseActionReturn<P>;

export type { UseAction, UseActionReturn };
