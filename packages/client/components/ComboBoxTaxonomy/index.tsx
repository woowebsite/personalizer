import React from 'react';
import { Select } from 'antd';

// graphql
import termTaxonomyService from '~/services/taxonomyService';

const { Option } = Select;
const ComboBoxTaxonomy = ({ type, ...others }) => {
  const { data, loading } = termTaxonomyService.getTaxonomiesByType(type);
  if (loading) return <Select {...others} />;
  const dataSource = data.termTaxonomies.rows;
  // render
  return (
    <Select {...others}>
      {dataSource.map(option => (
        <Option key={option.id} value={option.id}>
          {option.termName}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBoxTaxonomy;
