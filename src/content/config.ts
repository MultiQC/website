// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

const reportCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    embed: z.string(),
    zip: z.string(),
    data: z.string(),
  }),
});

export const collections = {
  "example-reports": reportCollection,
};
