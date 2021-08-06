import React, { forwardRef, useImperativeHandle, useState } from 'react';
import _ from 'lodash';
import ListThumbnails from '~/components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';
import albumService from 'services/albumService';
import { Spin } from 'antd';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';
import metadataFactory from '~/services/metadataService';
import { metadata2Fields } from '~/shared/metadataHelper';
interface IProps {
  entityId?: number;
}

const MockupTable = (props: IProps, ref) => {
  const { entityId } = props;
  const { data, loading, refetch, error } = metadataFactory(
    EntityType.ProductBase,
  ).getMetadata({
    variables: {
      where: {
        entityId: entityId,
        entityType: EntityType.ProductBase,
        taxonomy: TaxonomyType.ProductBase_Mockup,
      },
    },
  });

  const transformData = data => {
    if (!data || !data.termRelationships) return [];
    const result = _.map(data.termRelationships.rows, 'termTaxonomy.term').map(
      t => {
        const term = {
          ...t,
          ...metadata2Fields(t.metadata),
        };
        return term;
      },
    );

    return result;
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    refetch,
  }));

  if (loading) return <Spin />;
  return (
    <ListThumbnails
      dataSource={transformData(data).map(x => ({
        url: `/images/${x.image}`,
        href: `/images/[id]`,
        ...x,
      }))}
    />
  );
};

export default forwardRef(MockupTable);
