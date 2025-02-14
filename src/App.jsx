
import ComponentLibrary from "./components/ComponentLibrary";
import CalculatorCanvas from "./components/CalculatorCanvas";
import HistoryPanel from "./components/HistoryPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useCalculatorStore from "./store/useCalculatorStore";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function App() {
  const { toggleDarkMode, darkMode } = useCalculatorStore();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} min-h-screen overflow-x-hidden`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-lg md:text-xl font-bold">Drag & Drop Calculator</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-2xl bg-gray-200 dark:bg-gray-800 rounded-full hover:scale-110 transition"
          >
            {darkMode ? <CiLight /> : <MdDarkMode />}
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row w-full h-full">
          
          {/* Left Sidebar - Component Library */}
          <div className="w-full md:w-1/4 min-h-[50vh] md:min-h-screen">
            <ComponentLibrary />
          </div>

          {/* Center - Calculator Canvas */}
          <div className="flex-1 w-full min-h-[50vh] md:min-h-screen">
            <CalculatorCanvas />
          </div>

          {/* Right Sidebar - History Panel */}
          <div className="w-full md:w-1/4  md:min-h-screen">
            <HistoryPanel />
          </div>

        </div>
      </div>
    </DndProvider>
  );
}

export default App;
