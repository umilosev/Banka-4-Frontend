export type SomePartial<T, Members extends keyof T> = Partial<
  Pick<T, Members>
> &
  Omit<T, Members>;
