import { Timeline } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimeLine = ({ index, setIndex }) => {
  const [timelineItems, setTimelineItems] = useState([
    {
      color: "blue",
      children: (
        <button onClick={() => setIndex(0)} className="hover:text-slate-700">
          Personal Information
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(1)} className="hover:text-slate-700">
          Description
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(2)} className="hover:text-slate-700">
          Education
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(3)} className="hover:text-slate-700">
          Experience
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(4)} className="hover:text-slate-700">
          Achievement
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(5)} className="hover:text-slate-700">
          Project
        </button>
      ),
    },
    {
      color: "gray",
      children: (
        <button onClick={() => setIndex(6)} className="hover:text-slate-700">
          Skills
        </button>
      ),
    },
  ]);

  useEffect(() => {
    const newTimeline = timelineItems.map((item, idx) => {
      return idx <= index
        ? { ...item, color: "blue" }
        : { ...item, color: "gray" };
    });
    setTimelineItems(newTimeline);
  }, [index]);

  return (
    <div className="flex justify-between items-center py-4">
      {timelineItems.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center mx-6">
          <div
            className={`w-6 h-6 rounded-full border-4 ${
              item.color === "blue"
                ? "bg-blue-500 border-blue-500"
                : "bg-gray-300 border-gray-300"
            }`}
          >
            <button
              onClick={() => setIndex(idx)}
              className="w-full h-full flex items-center justify-center text-white"
            >
              {idx + 1}
            </button>
          </div>
          <div
            className={`mt-2 text-sm ${
              item.color === "blue" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {item.children}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
