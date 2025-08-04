import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar';

type SectionData = {
  [key: string]: string[];
};

const initialData: SectionData = {
  applications: ["First", "Second"],
  software: ["Eclipse", "IntelliJ"],
  tools: ["Jenkins", "GitHub", "AWS", "Jira"],
  resources: ["Wiki link", "Regression suite Excel", "App URL"],
};

const sectionTitles: { [key: string]: string } = {
  applications: "Applications",
  software: "Software",
  tools: "Tools",
  resources: "Resources",
};

const JOINER_ID = "newJoiner1";

// Toast helper (simple)
const showToast = (msg: string) => {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.className =
    "fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

// Avatar helper
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const ManagerPage = () => {
    const [sections, setSections] = useState<SectionData>(initialData);
    const [emailSent, setEmailSent] = useState(false);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceList = Array.from(sections[source.droppableId]);
        const [moved] = sourceList.splice(source.index, 1);

        const destList =
            source.droppableId === destination.droppableId
                ? sourceList
                : Array.from(sections[destination.droppableId]);
        destList.splice(destination.index, 0, moved);

        setSections((prev) => ({
            ...prev,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destList,
        }));
    };

    // Save configuration to localStorage
    const saveConfiguration = () => {
        localStorage.setItem(
            `joinerConfig-${JOINER_ID}`,
            JSON.stringify(sections)
        );
    };

    // Simulate sending welcome email
    const sendWelcomeEmail = () => {
        saveConfiguration();
        setEmailSent(true);
        const message = `
Welcome to QA, ${JOINER_ID}!
Your onboarding resources:
Applications: ${sections.applications.join(", ")}
Software: ${sections.software.join(", ")}
Tools: ${sections.tools.join(", ")}
Resources: ${sections.resources.join(", ")}
Link: https://your-app-url.com/new-joiner
        `;
        // Simulate email send
        console.log(message);
        alert("Welcome email sent!\n\nCheck console for details.");
    };

    // Helper to calculate completion percentage
const getCompletion = (statusObj: { [section: string]: { [item: string]: string } }) => {
    let total = 0;
    let completed = 0;
    Object.values(statusObj).forEach(section =>
        Object.values(section).forEach(status => {
            total += 1;
            if (status === "Completed") completed += 1;
        })
    );
    return total === 0 ? 0 : Math.round((completed / total) * 100);
};

// Mock joiner list (expand as needed)
const joiners = [
    { id: "newJoiner1", name: "Alice QA" },
    // Add more joiners here
];

    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Project Manager Dashboard</h1>
            <p className="mb-4">Manage new joiners and track their progress here.</p>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {Object.keys(sections).map((sectionKey) => (
                        <Droppable droppableId={sectionKey} key={sectionKey}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-white rounded shadow p-4 min-h-[200px]"
                                >
                                    <h2 className="text-xl font-semibold mb-4">{sectionTitles[sectionKey]}</h2>
                                    {sections[sectionKey].map((item, idx) => (
                                        <Draggable draggableId={`${sectionKey}-${idx}`} index={idx} key={`${sectionKey}-${idx}`}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`mb-2 p-2 rounded bg-blue-100 border ${
                                                        snapshot.isDragging ? "bg-blue-300" : ""
                                                    }`}
                                                >
                                                    {item}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={sendWelcomeEmail}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    disabled={emailSent}
                >
                    {emailSent ? "Welcome Email Sent" : "Send Welcome Email"}
                </button>
            </div>
            <div className="mt-12">
  <h2 className="text-xl font-bold mb-4">New Joiner Progress</h2>
  <div className="space-y-6">
    {joiners.map((joiner) => {
      const [loading, setLoading] = useState(false);
      const statusRaw = typeof window !== "undefined" ? localStorage.getItem(`joinerStatus-${joiner.id}`) : null;
      const statusObj = statusRaw ? JSON.parse(statusRaw) : {};
      const percent = getCompletion(statusObj);

      return (
        <div key={joiner.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {getInitials(joiner.name)}
            </div>
            <span className="font-semibold">{joiner.name}</span>
            <span
              className={`ml-auto px-2 py-1 rounded text-white text-xs ${
                percent === 100
                  ? "bg-green-600"
                  : percent >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {percent}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded h-4 mb-2">
            <div
              className="h-4 rounded transition-all"
              style={{
                width: `${percent}%`,
                background:
                  percent === 100
                    ? "#16a34a"
                    : percent >= 50
                    ? "#f59e42"
                    : "#ef4444",
              }}
            />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-1">Section</th>
                <th className="text-left py-1">Item</th>
                <th className="text-left py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(statusObj).map(([section, items]) =>
  Object.entries(items).map(([item, status]) => (
    <tr key={section + item}>
      <td className="py-1">{sectionTitles[section] || section}</td>
      <td className="py-1">{item}</td>
      <td className="py-1">
        <span
          className={`px-2 py-1 rounded text-xs text-white ${
            status === "Completed"
              ? "bg-green-600"
              : status === "In Progress"
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  ))
)}
            </tbody>
          </table>
          <button
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                showToast("Logged out!");
                // Add your logout logic here
              }, 1200);
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Logging out...
              </span>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      );
    })}
  </div>
</div>
        </div>
    );
};

export default ManagerPage;

// Add this to your global CSS for toast animation (optional):
/*
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in { animation: fade-in 0.3s ease; }
*/