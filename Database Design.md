1. Board
- id
- title
- description
- status

// Todo, blend màu, ... admin được tạo
1. Workflow
- id
- title
- status
- board_id

4. Task
- id
- title
- description
- demoColor         // Checkbox: Need demo color or not
- price
- priority
- due time
- money
- start time
- workflow_id
- tags
- assign_id
- leader_id
- customer_id

5. Activity
- id
- from_user_id
- to_user_id
- action_type: Assign, Done, CreateJob, UpdateJob, TransferMoney
- task_id
- description
- money

5. Comment
- taskId
- content: Dùng để post link
- userId



4. Team
- id
- leader_id
- description

2. User
- fb
- name
- role_id       // customer, employee, leader, helpdesk, admin

3. UserMeta
- id
- user_id
- key       // address, phone, fb
- value         

3. Wallet
- userId
- money
- created_date
- updated_date

3. Role
- id
- name: Employee, Customer, Leader, SystemAdmin, HelpDesk

// Bộ lọc dành riêng cho mỗi user
8. Filter
- id
- title
- conditions        // json
- model_name        // table name
- userId        // thuộc về user nào đó
- status        