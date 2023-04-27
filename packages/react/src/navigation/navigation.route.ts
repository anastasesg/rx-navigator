export type NavigationRoute<TParam> = {
  readonly name: string;
  readonly path: string;
  readonly params: TParam;
};
