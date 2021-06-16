import { TermRelationship } from '../../models';

const termRelationshiopRepository = {
  upsert: async (entityId: number, entityType: string, taxonomyId: number) => {
    const findObj = await TermRelationship.findOne({
      where: { taxonomyId, entityId, entityType },
    });
    const old = findObj || {};
    const data: any = {
      ...old,
      taxonomyId,
      entityId,
      entityType,
    };
    const [
      termRelationship,
      createTermRelationship,
    ] = await TermRelationship.upsert(data, {
      returning: true,
    });
    return termRelationship;
  },
};

export default termRelationshiopRepository;
