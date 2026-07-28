import { useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import contactsData from "./data/contacts.json";

function App() {
    const [currentContact, setCurrentContact] = useState(contactsData[0]);
    const [isDark, setIsDark] = useState(false);

    function toggleTheme() {
        setIsDark(prev => !prev);
    }

    return (
        <main className={isDark ? "dark" : ""}>
            <div className="min-h-screen bg-white dark:bg-slate-900">
                <Sidebar
                    contacts={contactsData}
                    currentContact={currentContact}
                    onSelectContact={setCurrentContact}
                    isDark={isDark}
                    onToggleTheme={toggleTheme}
                />
            </div>
        </main>
    );
}

export default App;