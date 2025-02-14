
import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  components: JSON.parse(localStorage.getItem("components")) || [],
  expression: localStorage.getItem("expression") || "",
  history: JSON.parse(localStorage.getItem("history")) || [],
  past: [],
  future: [],
  darkMode: localStorage.getItem("theme") === "dark",

  toggleDarkMode: () =>
    set((state) => {
      const newTheme = state.darkMode ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return { darkMode: !state.darkMode };
    }),

  addComponent: (component) =>
    set((state) => {
      const updatedComponents = [...state.components, component];
      localStorage.setItem("components", JSON.stringify(updatedComponents));

      return {
        past: [...state.past, { components: state.components, expression: state.expression }],
        future: [],
        components: updatedComponents,
      };
    }),

  removeComponent: (index) =>
    set((state) => {
      const updatedComponents = state.components.filter((_, i) => i !== index);
      localStorage.setItem("components", JSON.stringify(updatedComponents));

      return {
        past: [...state.past, { components: state.components, expression: state.expression }],
        future: [],
        components: updatedComponents,
      };
    }),

  updateExpression: (value) =>
    set((state) => {
      const updatedExpression = state.expression + value;
      localStorage.setItem("expression", updatedExpression);

      return {
        past: [...state.past, { components: state.components, expression: state.expression }],
        future: [],
        expression: updatedExpression,
      };
    }),

  calculateResult: () =>
    set((state) => {
      try {
        const result = new Function(`return ${state.expression}`)();
        const updatedHistory = [...state.history, `${state.expression} = ${result}`];

        localStorage.setItem("history", JSON.stringify(updatedHistory));
        localStorage.setItem("expression", result.toString());

        return {
          past: [...state.past, { components: state.components, expression: state.expression }],
          future: [],
          expression: result.toString(),
          history: updatedHistory,
        };
      } catch {
        return { expression: "Error" };
      }
    }),

  clearExpression: () =>
    set((state) => {
      localStorage.setItem("expression", "");
      return {
        past: [...state.past, { components: state.components, expression: state.expression }],
        future: [],
        expression: "",
      };
    }),

  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state; // Nothing to undo

      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        future: [{ components: state.components, expression: state.expression }, ...state.future],
        components: previous.components,
        expression: previous.expression,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state; // Nothing to redo

      const next = state.future[0];
      return {
        past: [...state.past, { components: state.components, expression: state.expression }],
        future: state.future.slice(1),
        components: next.components,
        expression: next.expression,
      };
    }),
}));

export default useCalculatorStore;















