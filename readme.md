User registers
// attributes
## User
- name
- email
- faculty
- department
- Academic level
- password
- role => [student, PRO, admin]

## Group
- name
- visibility => [public, private]
- members
- description
- messages
- notifications
- pending_members
- group_code

## GroupMember
- groupId
- userId
- status => [ban, removed]
- role => [student, PRO]
- 

## Message
- text
- created_at
- Group
