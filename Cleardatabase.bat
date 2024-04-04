echo "Deleting all test data"
curl http://localhost:3001/api/users/test/deletetestdata
curl http://localhost:3001/api/tasks/test/deletetestdata
curl http://localhost:3001/api/projects/test/deletetestdata
curl http://localhost:3001/registration/test/deletetestdata