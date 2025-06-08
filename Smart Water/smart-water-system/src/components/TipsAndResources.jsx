import React from "react";

const Tips = () => {
  const tipsData = [
    {title: "Water Audit",
      description: "Regularly check for leaks and monitor usage to reduce wastage.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Rainwater Harvesting",
      description: "Install systems to collect and use rainwater for various purposes.",
      color: "from-green-400 to-green-600",
    },
    {
      title: "Save Water Daily",
      description: "Turn off taps while brushing and fix dripping faucets promptly.",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Effective Water Usage",
      description: "Use water-efficient appliances and follow recommended usage limits.",
      color: "from-pink-400 to-pink-600",
    },
    {
      title: "Educate Others",
      description: "Raise awareness in your community about water conservation.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Reuse and Recycle",
      description: "Use greywater for gardening and cleaning wherever possible.",
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-gradient-to-br from-white to-slate-100">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">TIPS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tipsData.map((tip, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${tip.color} text-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105`}
          >
            <h2 className="text-2xl font-semibold mb-3">{tip.title}</h2>
            <p className="text-lg leading-relaxed">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
