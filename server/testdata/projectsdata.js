const testData = [
  {
      "project": "testiprojekti1",
      "manager": "testeri1",
      "users": ["testeri1"],
      "started": "10.10.1995",
      "ends": "10.10.2024",
      "tasks": [
          { "id": 1, "name": "Task 1 for Project 1", "status": "Not started", "deadline": "01/05/2024"},
          { "id": 2, "name": "Task 2 for Project 1", "status": "Completed", "deadline": "01/01/2024"}
      ]
  },
  {
      "project": "testiprojekti2",
      "manager": "testeri2",
      "users": ["testeri2"],
      "started": "10.10.1995",
      "ends": "10.10.2024",
      "tasks": [
          { "id": 1, "name": "Task 1 for Project 2", "status": "In Progress", "deadline": "01/06/2024" },
          { "id": 2, "name": "Task 2 for Project 2", "status": "Completed", "deadline": "01/02/2024" }
      ]
  },
  {
      "project": "testiprojekti3",
      "manager": "testeri3",
      "users": ["testeri3"],
      "started": "10.10.1995",
      "ends": "10.10.2024",
      "tasks": [
          { "id": 1, "name": "Task 1 for Project 3", "status": "Not started", "deadline": "01/07/2024" },
          { "id": 2, "name": "Task 2 for Project 3", "status": "Completed", "deadline": "01/03/2024" }
      ]
  }
];

module.exports = testData;