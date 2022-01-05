import React from 'react';
import TaxonomyType from './TaxonomyType';
import Select from "components/Select";

import termTaxonomyService from '~/services/taxonomyService';

const { Option } = Select;

const ComboBoxTaxonomy = ({ type, ...others }) => {
  const { data, loading } = termTaxonomyService.getTaxonomiesByType(type);
  if (loading) return <Select {...others} />;

  // render
  const dataSource = data.termTaxonomies.rows;
  return (
    <Select {...others}>
      {dataSource?.map(option => (
        <Option key={option.id} value={option.id}>
          {option.termName}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBoxTaxonomy;

export { TaxonomyType };
