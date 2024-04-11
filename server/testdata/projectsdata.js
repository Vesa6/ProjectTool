const testData = [
  {
      "project": "testiprojekti1",
      "manager": "testeri1",
      "users": ["testeri1"],
      "started": "1995-10-10",
      "ends": "2024-10-10",
      "tasks": [
          { "id": "1-1", "title": "Task 1 for Project 1", "status": "Not started", "start": "2024-05-01", "end": "2024-05-02"},
          { "id": "1-2", "title": "Task 2 for Project 1", "status": "Completed", "start": "2024-01-01", "end": "2024-01-02"}
      ]
  },
  {
      "project": "testiprojekti2",
      "manager": "testeri2",
      "users": ["testeri2"],
      "started": "1995-10-10",
      "ends": "2024-10-10",
      "tasks": [
          { "id": "2-1", "title": "Task 1 for Project 2", "status": "In Progress", "start": "2024-06-01", "end": "2024-06-02" },
          { "id": "2-2", "title": "Task 2 for Project 2", "status": "Completed", "start": "2024-02-01", "end": "2024-02-02" }
      ]
  },
  {
      "project": "testiprojekti3",
      "manager": "testeri3",
      "users": ["testeri3"],
      "started": "1995-10-10",
      "ends": "2024-10-10",
      "tasks": [
          { "id": "3-1", "title": "Task 1 for Project 3", "status": "Not started", "start": "2024-07-01", "end": "2024-07-02" },
          { "id": "3-2", "title": "Task 2 for Project 3", "status": "Completed", "start": "2024-03-01", "end": "2024-03-02" }
      ]
  }
];

module.exports = testData;
