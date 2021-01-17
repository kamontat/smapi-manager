type Fn<R> = () => R;

type Fn1<A, R> = (a: A) => R;

type Fn2<A, B, R> = (a: A, b: B) => R;

type Fn3<A, B, C, R> = (a: A, b: B, c: C) => R;

export type { Fn, Fn1, Fn2, Fn3 };
