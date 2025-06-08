import React from "react";
import {
  Droplet,
  CloudRain,
  Slash,
  Zap,
  Users,
  Repeat,
} from "lucide-react";


const Tips = () => {
  const tipsData = [
    {
      title: "Water Audit",
      description: [
        "Check for leaks in pipes and fixtures regularly.",
        "Monitor water bills for unusual spikes.",
        "Install water meters to track usage accurately.",
      ],
      icon: <Droplet size={32} />,
      colorClass: "tip-card-blue",
    },
    {
      title: "Rainwater Harvesting",
      description: [
        "Set up rooftop harvesting systems.",
        "Store rainwater in clean, covered tanks.",
        "Use collected rainwater for gardening or cleaning.",
      ],
      icon: <CloudRain size={32} />,
      colorClass: "tip-card-green",
    },
    {
      title: "Save Water Daily",
      description: [
        "Turn off the tap while brushing teeth.",
        "Fix leaking taps and toilets promptly.",
        "Use a bucket instead of a shower when possible.",
      ],
      icon: <Slash size={32} />,
      colorClass: "tip-card-purple",
    },
    {
      title: "Effective Water Usage",
      description: [
        "Use washing machines and dishwashers with full loads.",
        "Install low-flow showerheads and faucets.",
        "Follow manufacturer guidelines for water usage.",
      ],
      icon: <Zap size={32} />,
      colorClass: "tip-card-pink",
    },
    {
      title: "Educate Others",
      description: [
        "Organize community awareness programs.",
        "Teach children the importance of saving water.",
        "Share conservation tips on social media.",
      ],
      icon: <Users size={32} />,
      colorClass: "tip-card-yellow",
    },
    {
      title: "Reuse and Recycle",
      description: [
        "Collect greywater from laundry or bathing.",
        "Use recycled water for gardening or flushing.",
        "Avoid disposing of reusable water carelessly.",
      ],
      icon: <Repeat size={32} />,
      colorClass: "tip-card-red",
    },
  ];

  return (
    <div className="tips-wrapper">
      <div><h1 className="tips-title">Water Saving Tips</h1></div>
      <div className="tips-container">
        {tipsData.map((tip, index) => (
          <div key={index} className={`tip-card ${tip.colorClass}`}>
            <div className="tip-header">
              {tip.icon}
              <h2 className="tip-title">{tip.title}</h2>
            </div>
            <ul className="tip-points">
              {tip.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;