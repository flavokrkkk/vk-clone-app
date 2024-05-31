import { AllActionCreators } from "../store/action-creators";
import { useAppDispatch } from "./useAppDispatch";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(AllActionCreators, dispatch);
};
