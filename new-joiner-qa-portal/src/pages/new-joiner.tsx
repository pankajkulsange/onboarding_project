import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const JOINER_ID = "newJoiner1";
const STATUS_OPTIONS = ["Not Started", "In Progress", "Completed"];

type SectionData = {
  [key: string]: string[];
};

type StatusData = {
  [section: string]: {
    [item: string]: string;
  };
};

const sectionTitles: { [key: string]: string } = {
  applications: "Applications",
  software: "Software",
  tools: "Tools",
  resources: "Resources",
};

const STATUS_STORAGE_KEY = `joinerStatus-${JOINER_ID}`;

const NewJoiner = () => {
  const [sections, setSections] = useState<SectionData>({});
  const [status, setStatus] = useState<StatusData>({});

  useEffect(() => {
    // Fetch configuration from localStorage
    const config = localStorage.getItem(`joinerConfig-${JOINER_ID}`);
    if (config) {
      const parsed = JSON.parse(config);
      setSections(parsed);

      // Try to fetch saved status
      const savedStatus = localStorage.getItem(STATUS_STORAGE_KEY);
      if (savedStatus) {
        setStatus(JSON.parse(savedStatus));
      } else {
        // Initialize status for each item as "Not Started"
        const initialStatus: StatusData = {};
        Object.keys(parsed).forEach((section) => {
          initialStatus[section] = {};
          parsed[section].forEach((item: string) => {
            initialStatus[section][item] = "Not Started";
          });
        });
        setStatus(initialStatus);
      }
    }
  }, []);

  const handleStatusChange = (
    section: string,
    item: string,
    newStatus: string
  ) => {
    setStatus((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [item]: newStatus,
        },
      };
      // Save to localStorage (mock storage)
      localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">New Joiner Dashboard</h1>
        <p className="mb-4">
          Welcome to your dashboard! Here you can find the applications, tools, and
          resources selected by your project manager.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(sections).map((sectionKey) => (
            <div key={sectionKey} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">
                {sectionTitles[sectionKey]}
              </h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2">Item</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sections[sectionKey].map((item: string) => (
                    <tr key={item}>
                      <td className="py-2">{item}</td>
                      <td className="py-2">
                        <select
                          value={status[sectionKey]?.[item] || "Not Started"}
                          onChange={(e) =>
                            handleStatusChange(sectionKey, item, e.target.value)
                          }
                          className="border rounded p-1"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewJoiner;