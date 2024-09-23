import { createClient } from "@sanity/client"

const config = {
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: import.meta.env.VITE_DATASET,
    useCdn: true,
    apiVersion: import.meta.env.VITE_API_VERSION,
}

export const sanityClient = createClient(config)