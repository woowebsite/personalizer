# Load tabs

Load tabs from table `filter` by `user_id`, `model_name` `status=A`
Each tab has a conditions which will be merged with values of FilterForm to make a searchCriteria

# Default tab: All

Default tab `All` has condition 'status=A'

# Usage

```js
<TableFilter<User>
  modelName="Customer"    // field này sử dụng để filter
  query={userService.getAll}
  filterRender={props => renderFilter(props)}
  tableRender={props => renderTable(props)}
/>
```

# Adding filter on Table

```json
[
  {
    "id": 1,
    "title": "Nhân viên",
    "conditions": "{\"role_id\":4}",    // {"metadata":{"key":"customerType", "value":"1"}}
    "model_name": "User",     // The table that filter on
    "status": "A",
    "user_id": 1,
    "__typename": "Filter"
  }
]
```
