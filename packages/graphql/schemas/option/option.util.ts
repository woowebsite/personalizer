import { Option } from '../../models';

export const upsertOptions = (options: Option[]) => {
  options.forEach(async (option: Option) => {
    const o = await Option.findOne({ where: { key: option.key } });

    const updateObj: any = {
      id: o && o.id,
      ...option,
    };

    Option.upsert(updateObj);
  });
};
