export function getAvailableModels(apiBase: string, apiKey: string): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(apiBase + "/models", {
                method: "GET",
                headers: {
                    'api-key': apiKey,
                },
            })
            const data = await response.json();
            resolve(data.data.map((model: any) => model.id).sort());
        } catch (err) {
            reject(err);
        }
    });
};

export function getAvailableChatModels(apiBase: string, apiKey: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        getAvailableModels(apiBase, apiKey)
            .then((models) => {
                resolve(models.filter((model) => model.startsWith("gpt-")));
            })
            .catch((err) => {
                reject(err);
            });
    });
};
