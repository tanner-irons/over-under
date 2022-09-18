import { useDispatch } from "react-redux";
import { RootDispatch } from "../store/store";

export const useRootDispatch = () => useDispatch<RootDispatch>()
