import { Provider } from "react-redux";
import { store } from "./store/store";
import AppEntry from "./AppEntry";

export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}
