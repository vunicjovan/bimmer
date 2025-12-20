import { useEffect, useState } from "react";
import { getHealth } from "./api/health";

function App() {
    const [health, setHealth] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getHealth()
            .then(setHealth)
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Health Check</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {health ? (
                <pre>{JSON.stringify(health, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
