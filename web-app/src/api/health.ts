export async function getHealth() {
    const res = await fetch("/api/v1/health/");
    if (!res.ok) throw new Error("Failed to fetch health");
    return res.json();
}
