export interface IApiResource<T> {
  url: string;
  endpoint?: string;
}

export interface IApiResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<IApiResource<T>>;
}
