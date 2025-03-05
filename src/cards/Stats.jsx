const Stats = ({ stats = [] }) => {
    return (
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md bg-white ${stat.color}`}>
            <h3 className="text-lg font-bold">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
            <span className="text-sm">{stat.change} {stat.period}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default Stats;