import { useEffect, useReducer } from "react";
import { getDateKey } from "../utils/date";

const THEME_KEY = "taskboard.theme.v1";

const initialState = {
  filter: "all",
  priority: "all",
  search: "",
  view: "tasks",
  sidebarOpen: true,
  formOpen: false,
  taskToEdit: null,
  draftDueDate: getDateKey(),
  selectedDate: getDateKey(),
  theme:
    typeof window !== "undefined" &&
    window.localStorage.getItem(THEME_KEY) === "dark"
      ? "dark"
      : "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.value };
    case "SET_PRIORITY":
      return { ...state, priority: action.value };
    case "SET_SEARCH":
      return { ...state, search: action.value };
    case "SET_VIEW":
      return {
        ...state,
        view: action.value,
        filter: "all",
        priority: "all",
        search: "",
        selectedDate:
          action.value === "today" ? getDateKey() : state.selectedDate,
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.value,
        view: "today",
        filter: "all",
        search: "",
      };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "OPEN_CREATE":
      return {
        ...state,
        formOpen: true,
        taskToEdit: null,
        draftDueDate: action.value || getDateKey(),
      };
    case "OPEN_EDIT":
      return { ...state, formOpen: true, taskToEdit: action.task };
    case "CLOSE_FORM":
      return {
        ...state,
        formOpen: false,
        taskToEdit: null,
        draftDueDate: getDateKey(),
      };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export function useTaskboardUi() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, state.theme);
  }, [state.theme]);

  return {
    ...state,
    setFilter: (value) => dispatch({ type: "SET_FILTER", value }),
    setPriority: (value) => dispatch({ type: "SET_PRIORITY", value }),
    setSearch: (value) => dispatch({ type: "SET_SEARCH", value }),
    setView: (value) => dispatch({ type: "SET_VIEW", value }),
    setSelectedDate: (value) => dispatch({ type: "SET_SELECTED_DATE", value }),
    toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
    openCreate: (value) => dispatch({ type: "OPEN_CREATE", value }),
    openEdit: (task) => dispatch({ type: "OPEN_EDIT", task }),
    closeForm: () => dispatch({ type: "CLOSE_FORM" }),
    toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
  };
}
