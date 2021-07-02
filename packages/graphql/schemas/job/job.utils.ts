import { JobMeta } from '../../models';

export const upsertMetadata = (metadata: JobMeta[], job_id) => {
  metadata.map((meta: JobMeta) => {
    const updateCodeJob: any = {
      job_id: job_id,
      key: meta.key,
      ...meta,
    };

    JobMeta.upsert(updateCodeJob);
  });
};
