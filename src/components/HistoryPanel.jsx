import useCalculatorStore from "../store/useCalculatorStore";

const HistoryPanel = () => {
  const { history, darkMode } = useCalculatorStore();

  return (
    <div 
      className={`p-4 md:p-6 w-full  h-auto md:min-h-screen  
        ${darkMode ? "dark bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900"}
      `}
    >
      <h2 className="text-lg md:text-xl font-bold mb-4">Calculation History</h2>
      
      {/* Scrollable History List */}
      <ul className="list-disc pl-4 overflow-y-auto max-h-[80vh]">
        {history.length === 0 ? (
          <li className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>No history yet</li>
        ) : (
          history.map((entry, index) => (
            <li key={index} className="py-1">{entry}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HistoryPanel;
