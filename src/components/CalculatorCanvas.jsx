
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButton from "./CalculatorButton";

const CalculatorCanvas = () => {
  const { components, addComponent, updateExpression, calculateResult, clearExpression, undo, redo, darkMode } =
    useCalculatorStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => addComponent(item.component),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (/[0-9+\-*/]/.test(key)) {
        updateExpression(key);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        clearExpression();
      } else if (key === "z" && event.ctrlKey) {
        undo();
      } else if (key === "y" && event.ctrlKey) {
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [updateExpression, calculateResult, clearExpression, undo, redo]);

  return (
    <div
      className={`flex flex-col items-center p-4 w-full max-w-3xl mx-auto lg:min-h-screen 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <CalculatorDisplay />

      {/* Drop Zone for Components */}
      <div
        ref={drop}
        className={`grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4 border min-h-[300px] w-full 
          transition-colors rounded-md shadow-md
          ${isOver ? "bg-blue-100 border-blue-500" : darkMode ? "bg-gray-800 border-gray-600" : "bg-gray-50"}`}
      >
        {components.map((comp, index) => (
          <CalculatorButton key={index} component={comp} index={index} />
        ))}
      </div>

      {/* Undo & Redo Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={undo}
          className={`p-2 px-4 text-sm sm:text-md cursor-pointer rounded-md font-semibold transition duration-200
            ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
        >
          Undo
        </button>
        <button
          onClick={redo}
          className={`p-2 px-4 text-sm sm:text-md cursor-pointer rounded-md font-semibold transition duration-200
            ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default CalculatorCanvas;

