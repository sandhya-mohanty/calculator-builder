
import { useDrag } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";

const ComponentLibrary = () => {
  const buttons = [
    { id: "num", label: "1", type: "number", value: "1" },
    { id: "num", label: "2", type: "number", value: "2" },
    { id: "num", label: "3", type: "number", value: "3" },
    { id: "num", label: "4", type: "number", value: "4" },
    { id: "num", label: "5", type: "number", value: "5" },
    { id: "num", label: "6", type: "number", value: "6" },
    { id: "num", label: "7", type: "number", value: "7" },
    { id: "num", label: "8", type: "number", value: "8" },
    { id: "num", label: "9", type: "number", value: "9" },
    { id: "num", label: "0", type: "number", value: "0" },
    { id: "num", label: "00", type: "number", value: "00" },
    { id: "num", label: ".", type: "number", value: "." },
    { id: "op", label: "+", type: "operator", value: "+" },
    { id: "op", label: "-", type: "operator", value: "-" },
    { id: "op", label: "*", type: "operator", value: "*" },
    { id: "op", label: "/", type: "operator", value: "/" },
    { id: "clear", label: "C", type: "clear", value: "C" },
    { id: "equals", label: "=", type: "equals", value: "=" },
  ];
  const { darkMode } = useCalculatorStore();

  return (
    <div
      className={`p-4 w-full  h-auto md:min-h-screen ${
        darkMode ? "dark bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
        Component Library
      </h2>
      <div
        className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 cursor-pointer  ${darkMode?"text-black":""}`}
      >
        {buttons.map((button, index) => (
          <DraggableButton key={index} component={button} />
        ))}
      </div>
    </div>
  );
};

const DraggableButton = ({ component }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      className={`p-2 md:p-3 lg:p-4 border cursor-pointer rounded text-center bg-gray-300 hover:bg-gray-400 transition-all 
      text-sm md:text-base lg:text-lg font-semibold ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {component.label}
    </button>
  );
};

export default ComponentLibrary;


