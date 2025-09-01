import { Bucket } from "encore.dev/storage/objects";

// Public bucket for course completion certificates.
export const certificatesBucket = new Bucket("certificates", {
  public: true,
});
