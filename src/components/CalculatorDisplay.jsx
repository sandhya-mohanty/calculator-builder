
import useCalculatorStore from "../store/useCalculatorStore";

const CalculatorDisplay = () => {
  const { expression, darkMode } = useCalculatorStore();

  return (
    <div
      className={`w-full mb-4 p-4 border text-right text-xl sm:text-2xl md:text-3xl font-bold rounded-md shadow-md 
        ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-50 text-black"}`}
    >
      {expression || "0"}
    </div>
  );
};

export default CalculatorDisplay;

