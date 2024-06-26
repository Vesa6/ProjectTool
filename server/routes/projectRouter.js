const projectRouter = require("express").Router();
const testData = require("../testdata/projectsdata");
const { ObjectId } = require("mongodb");

projectRouter.get("/", async (request, response) => {
  try {
    console.log("getting");
    const db = request.app.locals.db;
    const result = await db.collection("projects").find().toArray();
    response.json(result);
    console.log(result);
    console.log("GET ALL succesful");
  } catch {
    console.log("Getting all users failed ");
    response.status(400).end("error");
  }
});

projectRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("Sending POST request");
  if (body) {
    const project = {
      data: body,
      tasks: [],
    };
    try {
      const db = request.app.locals.db;
      if (project) {
        const result = await db.collection("projects").insertOne(project);
        console.log("POST was succesful");
        response.json(result);
      }
    } catch (e) {
      console.log(e);
      response.status(400).end(console.log(e));
    }
  } else {
    response.json("POST failed");
    response.status(400).end(console.log("Request failed"));
  }
});

projectRouter.get("/:id", async (request, response) => {
  try {
    const db = request.app.locals.db;
    const filter = { id: request.params.id };
    const result = await db.collection("projects").find(filter).toArray();
    response.json(result);
    console.log("GET User with uuid succesful");
    console.log(result);
  } catch (e) {
    console.log(e);
    response.status(400).end("error");
  }
});

projectRouter.put("/:id", async (request, response) => {
  const updateOptions = {
    // If set to true, creates a new document when no document matches the filter
    upsert: false,
    // If set to true, returns the updated document instead of the original document
    returnOriginal: false,
  };
  body = request.body;
  console.log("Sending PUT request");
  const projectId = new ObjectId(request.params.id);
  let update = {
    $set: {
      data: body.data,
      tasks: body.tasks,
      participants: body.participants,
    },
  };
  try {
    const db = request.app.locals.db;
    const filter = { _id: request.params.id };
    const result = await db
      .collection("projects")
      .updateOne({_id: projectId}, update, updateOptions);
    response.json(result);
    console.log("PUT succesful");
    console.log(result);
  } catch (e) {
    response.status(400).end("Error");
    console.log(e);
  }
});

projectRouter.put("/:id/update-project", async (request, response) => {
  const db = request.app.locals.db;
  const projectId = new ObjectId(request.params.id);

  try {
    const updateResult = await db
      .collection("projects")
      .updateOne({ _id: projectId }, { $set: { data: request.body } });
    console.log("MongoDB Update Result:", updateResult);
  } catch (error) {
    console.error("Database operation failed:", error);
    response.status(500).send("Error updating project");
  }
});

projectRouter.put("/:id/update-costs", async (request, response) => {
  const db = request.app.locals.db;
  const projectId = new ObjectId(request.params.id);

  try {
    const updatedCosts = {
      actual: request.body.actual,
      planned: request.body.planned,
      budget: request.body.budget,
    };

    const updateResult = await db
      .collection("projects")
      .updateOne({ _id: projectId }, { $set: updatedCosts });

    console.log("MongoDB Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return response.status(404).send("Project not found");
    }

    response.send("Project costs updated successfully");
  } catch (error) {
    console.error("Database operation failed:", error);
    response.status(500).send("Error updating project costs");
  }
});

// For calendars new tasks.
projectRouter.put("/:id/add-task", async (request, response) => {
  const db = request.app.locals.db;
  const projectId = new ObjectId(request.params.id);

  // console.log('Received Project ID:', request.params.id);
  // console.log('Converted to ObjectId:', projectId);

  try {
    const task = {
      _id: new ObjectId(), //Use this as unique ID. I don't think this needs to be displayed anywhere, but this is solid and easy to do.
      title: request.body.title,
      status: request.body.status || "In Progress",
      start: request.body.start,
      end: request.body.end || "", // not used atm so whatever
      participants: request.body.participants || [],
      ...request.body,
    };

    const updateResult = await db
      .collection("projects")
      .updateOne({ _id: projectId }, { $push: { tasks: task } });

    console.log("MongoDB Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return response.status(404).send("Project not found");
    }

    response.send("Task added successfully");
  } catch (error) {
    console.error("Database operation failed:", error);
    response.status(500).send("Error adding task to project");
  }
});


projectRouter.delete("/:id", async (request, response) => {
  try {
    const db = request.app.locals.db;
    const filter = { _id: new ObjectId(request.params.id) };
    console.log(filter);
    const result = await db.collection("projects").deleteOne(filter);
    response.json(result);
    console.log("DELETE was succesful");
  } catch (e) {
    console.log(e);
    response.status(400).end("error");
  }
});

projectRouter.get("/test/addtestdata", async (request, response) => {
  try {
    const db = request.app.locals.db;
    testData.forEach((jsonObj) => {
      console.log(jsonObj);
      db.collection("projects").insertOne(jsonObj);
    });
    response.json("test data added");
  } catch (e) {
    console.log(e);
    response.status(400).end("error");
  }
});

projectRouter.get("/test/deletetestdata", async (request, response) => {
  try {
    const db = request.app.locals.db;
    let projects = await db.collection("projects").find().toArray();
    console.log(projects);
    projects.forEach((object) => {
      let filter = { _id: object._id };
      db.collection("projects").deleteOne(filter);
    });
    response.json("test data removed");
  } catch (e) {
    console.log(e);
    response.status(400).end("error");
  }
});

projectRouter.put("/:id/update-task", async (request, response) => {
  const db = request.app.locals.db;
  const projectId = new ObjectId(request.params.id);

  try {
    const taskId = new ObjectId(request.body._id);
    const updateResult = await db.collection("projects").updateOne(
      {
        _id: projectId,
        "tasks._id": taskId,
      },
      {
        $set: {
          "tasks.$.title": request.body.title,
          "tasks.$.status": request.body.status,
          "tasks.$.start": request.body.start,
          "tasks.$.end": request.body.end,
          "tasks.$.participants": request.body.participants,
        },
      }
    );

    console.log("MongoDB Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return response.status(404).send("Task not found");
    }

    response.send("Task updated successfully");
  } catch (error) {
    console.error("Database operation failed:", error);
    response.status(500).send("Error updating task");
  }
});

projectRouter.delete("/:id/delete-task/:taskId", async (request, response) => {
  const db = request.app.locals.db;
  const projectId = new ObjectId(request.params.id);
  const taskId = new ObjectId(request.params.taskId);

  try {
    const updateResult = await db.collection("projects").updateOne(
      {
        _id: projectId,
      },
      {
        $pull: {
          tasks: {
            _id: taskId,
          },
        },
      }
    );

    console.log("MongoDB Update Result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return response.status(404).send("Task not found");
    }

    response.send("Task deleted successfully");
  } catch (error) {
    console.error("Database operation failed:", error);
    response.status(500).send("Error deleting task");
  }
});

module.exports = projectRouter;
