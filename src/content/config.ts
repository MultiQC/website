// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

const reportCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    embed: z.string(),
    zip: z.string(),
    data: z.string(),
  }),
});

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

const modulesCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    urls: z.array(z.string().url()),
    summary: z.string(),
    extra_description: z.string().optional(),
  }),
});

export const collections = {
  "example-reports": reportCollection,
  docs: docsCollection,
  modules: modulesCollection,
};
