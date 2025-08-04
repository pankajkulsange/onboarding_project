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
        </div>
    );
};

export default ManagerPage;