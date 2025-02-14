
import { AiFillDelete } from "react-icons/ai";
import useCalculatorStore from "../store/useCalculatorStore";

const CalculatorButton = ({ component, index }) => {
  const { updateExpression, calculateResult, clearExpression, removeComponent, darkMode } =
    useCalculatorStore();

  const handleClick = () => {
    if (component.type === "equals") {
      calculateResult();
    } else if (component.type === "clear") {
      clearExpression();
    } else {
      updateExpression(component.value);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <button
        onClick={handleClick}
        className={`p-4 w-14 sm:w-16 md:w-20 lg:w-24 text-lg sm:text-xl font-semibold border rounded-md text-center cursor-pointer shadow-md transition 
          ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
      >
        {component.label}
      </button>
      <button
        onClick={() => removeComponent(index)}
        className="mt-1 ml-2 text-xl sm:text-2xl text-red-500 hover:text-red-700 transition duration-200"
      >
        <AiFillDelete />
      </button>
    </div>
  );
};

export default CalculatorButton;

