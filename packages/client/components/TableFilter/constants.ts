import StatusType from '~/models/StatusType';

export const defaultConditions = {
  status: StatusType.Actived,
};

export interface FilterConfig {
  modelName: string;
}
