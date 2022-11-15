interface eventConfig<DataState> {
  storageKey: string;
  data: DataState;
  transform: Function;
}
export function onLoadEvent<DataState>(opts: eventConfig<DataState>) {
  let { storageKey = "default", data } = opts;

  window.addEventListener("onbeforeunload", () => {
    data && localStorage.setItem(storageKey, JSON.stringify(data));
  });

  let lastData = localStorage.getItem(storageKey);
  if (lastData) return JSON.parse(lastData);
}
