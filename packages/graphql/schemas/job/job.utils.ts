import JobStatus from '../../constants/JobStatus';
import JobTaxonomy from '../../constants/JobTaxonomy';
import { Job, JobMeta, JobTerm, TermTaxonomy } from '../../models';

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

export const upsertTaxonomies = (
  jobTerms: JobTerm[],
  old: JobTerm[],
  job_id,
) => {
  jobTerms.map((taxonomy: JobTerm) => {
    const j = old.find(
      x =>
        x.ref_id === job_id && x.term_taxonomy_id === taxonomy.term_taxonomy_id,
    );

    const updateObj: any = {
      id: j && j.id,
      job_id: job_id,
      ...taxonomy,
    };

    JobTerm.upsert(updateObj);
  });
};

export const getJobStatusByTaxonomies = (
  taxonomies: any[],
  initialStatus: string | JobStatus = JobStatus.Active,
) => {
  let status = initialStatus;
  if (taxonomies.includes(JobTaxonomy.New)) status = JobStatus.Active;
  else if (
    taxonomies.includes(JobTaxonomy.Todo) ||
    taxonomies.includes(JobTaxonomy.Blend) ||
    taxonomies.includes(JobTaxonomy.Retouch)
  )
    status = JobStatus.InProgress;
  else if (taxonomies.includes(JobTaxonomy.Finish)) status = JobStatus.Finish;

  return status;
};
