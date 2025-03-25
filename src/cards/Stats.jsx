import { useSelector } from "react-redux";

const Stats = ({ stats = [] }) => {
  const darkMode = useSelector((state) => state.hrTheme.darkMode);

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 border-b border-e-[5px] rounded-xl shadow-md ${
            stat.color
          } ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
        >
          <h3 className="text-lg font-bold">{stat.title}</h3>
          <p className="text-2xl">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
