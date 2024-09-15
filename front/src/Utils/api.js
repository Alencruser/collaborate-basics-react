async function apiFetch(endpoint = "",config = {}) {
    const baseConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const request = await fetch(`http://localhost:8080/${endpoint}`, {...baseConfig, ...config});
    const response = await request.json();
    return {
        ok:request.ok,
        data: request.ok ? response.data : response.err
    }
}

export default apiFetch;