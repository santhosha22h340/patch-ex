

## Summary of changes
1. Search query precedence (TaskRepository.java, db/oracle task_search_package.sql, db/queries/search_task.sql): AND/OR had no parentheses, so the status and archived filters applied to only part of the condition. Added parentheses.
2. TaskController.java: removed an artificial Thread.sleep that slowed short searches; invalid status now returns 400 instead of 500; page and pageSize are validated.
3. App.jsx: page resets to 1 when search or status changes.
4. useTasks.js: ignores stale responses, clears old errors, always ends the loading state, debounces search by 300 ms.

## What I chose not to change
I read api.js, SearchBar, StatusFilter, TaskTable, styles.css, Task.java, schema/data SQL and the config. I found no clear bugs there, so I left them alone to keep the diff small.

## Biggest remaining risk
Pagination happens in memory: all matching rows are loaded, then sliced. This will be slow with large data. Also, % and _ typed by users act as LIKE wildcards, and status is stored as a plain String.

## Tools used
I used Claude to help read the code, spot bugs and draft fixes. I ran the backend and frontend and tested each fix manually (status filter, invalid status, page=0, total count, pagination, debounce, error state). I could not run the Oracle PL/SQL file locally, so that change is based on reasoning only.