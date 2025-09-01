import { Bucket } from "encore.dev/storage/objects";

// Public bucket for testimonies.
export const testimoniesBucket = new Bucket("testimonies", {
  public: true,
});
