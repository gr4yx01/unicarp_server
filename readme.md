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

- implement registration ✅
- implement login ✅
- PRO create group ✅
- admin create faculty ✅
- admin delete faculty ✅
- admin create department ✅
- admin delete department ✅
- create user ✅
- admin & PRO delete group ✅
- list groups ✅
- list faculty ✅
- list department ✅
- member request to join group ✅
    - join directly on public group ✅
    - pending join on private group ✅
- Student access group ✅
- list group members ✅
- PRO sends message ✅
- PRO delete message ✅
- list group messages ✅
- user request to join group ✅
- groups requests ✅
- PRO accept user request ✅
- PRO reject user request ✅
- admin assign PRO to user ✅
- admin demote PRO to user ✅
- PRO edit group ✅
- list all students ✅
- list all PROs ✅