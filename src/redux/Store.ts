import {createStore, type Store} from "redux"
import Main_Reducer from "./reducers/Main_reducer"
export const MainStore : Store<{
    USER: any;
    URL: string;
    token: string;
    isLoading: boolean;
    Theme: string;}> = createStore(Main_Reducer)


