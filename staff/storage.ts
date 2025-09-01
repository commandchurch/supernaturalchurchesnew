import { Bucket } from "encore.dev/storage/objects";

// Private bucket for staff documents (IDs, licenses, checks)
// We keep this private and use signed URLs to upload/download.
export const staffDocsBucket = new Bucket("staff-docs");
