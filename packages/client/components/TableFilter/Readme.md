# Load tabs

Load tabs from table `filter` by `user_id`, `model_name` `status=A`
Each tab has a conditions which will be merged with values of FilterForm to make a searchCriteria

# Usage

```js
<TableFilter<User>
  modelName="User"
  query={userService.getAll}
  filterRender={props => renderFilter(props)}
  tableRender={props => renderTable(props)}
/>
```
