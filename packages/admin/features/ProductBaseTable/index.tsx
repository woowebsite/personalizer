import React from 'react';
import { useIntl } from 'react-intl';

// components
import TableQuickEdit from 'components/TableQuickEdit';
import TableFilter from 'components/TableFilter';
import QuickForm from './QuickForm';
import FilterForm from './FilterForm';

import { columns } from './columns';
import productBaseService from 'services/productBaseService';
import usersService from 'services/userService';

const ProductBaseTable = props => {
  // DEFINES
  const tableRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });

  // RENDER
  const renderFilter = props => <FilterForm {...props} />;
  const renderTable = props => (
    <TableQuickEdit
      {...props}
      ref={tableRef}
      rowKey="id"
      mutation={productBaseService.upsert}
      quickForm={(record, mutate) => (
        <QuickForm
          values={record}
          onSave={values =>
            mutate({
              variables: { user: values },
            })
          }
        />
      )}
      columns={columns(t)}
    />
  );

  return (
    <>
      <TableFilter
        filterOptions={{
          modelName: 'ProductBase',
        }}
        modelName="ProductBase"
        pluralName="ProductBases"
        query={productBaseService.getAll}
        filterRender={props => renderFilter(props)}
        tableRender={props => renderTable(props)}
      />
    </>
  );
};

export default ProductBaseTable;
