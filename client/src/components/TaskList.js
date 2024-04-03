import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

// Define your columns here
const columns = [
  { field: 'project', headerName: 'Project', width: 150 },
  { field: 'taskName', headerName: 'Task Name', width: 200 },
  { field: 'deadline', headerName: 'Deadline', type: 'date', width: 120 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'assignee', headerName: 'Assignee', width: 150 },
];

// Mock data for the tasks
const rows = [
  { id: 1, project: 'Project Z', taskName: 'Write API documentation', deadline: '2024-03-02', status: 'Ongoing', assignee: 'John Doe' },
  { id: 2, project: 'Project Z', taskName: 'Implement login feature', deadline: '2024-03-06', status: 'Not started', assignee: 'Jane Smith' },
  { id: 3, project: 'Project X', taskName: 'Conduct user interviews', deadline: '2024-06-03', status: 'Ongoing', assignee: 'Emily Johnson' },
  { id: 4, project: 'Project X', taskName: 'Optimize SEO', deadline: '2024-06-03', status: 'Ongoing', assignee: 'Michael Brown' },
  // ... more tasks
];

const TaskTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default TaskTable;
