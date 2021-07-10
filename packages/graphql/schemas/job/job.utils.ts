import { JobMeta } from '../../models';

export const upsertMetadata = (metadata: JobMeta[], old: JobMeta[], job_id) => {
  metadata.map((meta: JobMeta) => {
    const m = old.find(x => x.job_id === job_id && x.key === meta.key);
    const updateCodeJob: any = {
      id: m && m.id,
      job_id: job_id,
      key: meta.key,
      ...meta,
    };

    JobMeta.upsert(updateCodeJob);
  });
};
