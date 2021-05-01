/* eslint-disable @typescript-eslint/no-explicit-any */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

export type DeepRecord<I, T> = {
  [P in keyof Required<I>]: Exclude<I[P], undefined> extends Record<string, unknown>
    ? DeepRecord<I[P], T>
    : T;
};

export type OverloadedReturnType<T> = T extends {
  (...args: any[]): infer R;
  (...args: any[]): infer R;
  (...args: any[]): infer R;
  (...args: any[]): infer R;
}
  ? R
  : T extends {
      (...args: any[]): infer R;
      (...args: any[]): infer R;
      (...args: any[]): infer R;
    }
  ? R
  : T extends {
      (...args: any[]): infer R;
      (...args: any[]): infer R;
    }
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : any;
