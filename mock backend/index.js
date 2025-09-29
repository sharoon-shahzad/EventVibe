import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Helper functions ---
const readData = (file) => JSON.parse(fs.readFileSync(`./data/${file}.json`));
const writeData = (file, data) =>
  fs.writeFileSync(`./data/${file}.json`, JSON.stringify(data, null, 2));
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let activeTokens = [];

// --- Auth Routes ---
app.post("/auth/login", async (req, res) => {
  await delay(300);
  const { email, password } = req.body;
  const users = readData("users");
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const token = `dummyToken_${user.id}`;
  activeTokens.push(token);
  res.json({ ...user, token });
});

app.post("/auth/register", async (req, res) => {
  await delay(300);
  const users = readData("users");
  const { name, email, password, role = "user" } = req.body;
  const id = users.length + 1;
  const newUser = { id, name, email, password, role };
  users.push(newUser);
  writeData("users", users);
  const token = `dummyToken_${id}`;
  activeTokens.push(token);
  res.json({ ...newUser, token });
});

app.post("/auth/invalidate", async (req, res) => {
  await delay(200);
  const { token } = req.body;
  activeTokens = activeTokens.filter((t) => t !== token);
  res.json({ success: true, message: "Session invalidated" });
});

app.get("/auth/me", async (req, res) => {
  await delay(200);
  const token = req.headers.authorization?.split(" ")[1];
  if (!activeTokens.includes(token))
    return res.status(401).json({ message: "Invalid session" });
  const id = parseInt(token.split("_")[1]);
  const users = readData("users");
  const user = users.find((u) => u.id === id);
  res.json(user);
});

// --- Events ---
app.get("/events", async (req, res) => {
  await delay(200);
  const events = readData("events");
  res.json(events);
});

app.get("/events/:id", async (req, res) => {
  const events = readData("events");
  const event = events.find((e) => e.id == req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  // Attach attendee info
  const attendance = readData("attendance");
  const users = readData("users");

  const attendees = attendance
    .filter((a) => a.eventId == event.id)
    .map((a) => ({
      id: a.id,
      status: a.status,
      user: users.find((u) => u.id == a.userId),
    }));

  res.json({ ...event, attendees });
});

app.post("/events", async (req, res) => {
  await delay(200);
  const events = readData("events");
  const id = events.length + 1;
  const newEvent = { id, registeredUsers: [], ...req.body };
  events.push(newEvent);
  writeData("events", events);
  res.json(newEvent);
});

// --- Event Registration + Attendance ---
app.post("/events/:id/register", async (req, res) => {
  await delay(200);
  const { userId } = req.body;
  const events = readData("events");
  const event = events.find((e) => e.id == req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  // Attendance file
  const attendance = readData("attendance");

  // Check if already registered
  const existing = attendance.find(
    (a) => a.eventId == event.id && a.userId == userId
  );
  if (!existing) {
    const newRecord = {
      id: attendance.length + 1,
      eventId: event.id,
      userId,
      status: "registered",
    };
    attendance.push(newRecord);
    writeData("attendance", attendance);
  }

  if (!event.registeredUsers.includes(userId))
    event.registeredUsers.push(userId);

  writeData("events", events);
  res.json({ eventId: event.id, userId });
});

// --- Get attendees (admin) ---
app.get("/events/:id/attendees", async (req, res) => {
  await delay(200);
  const attendance = readData("attendance");
  const users = readData("users");
  const eventAttendees = attendance
    .filter((a) => a.eventId == req.params.id)
    .map((a) => ({
      ...a,
      user: users.find((u) => u.id == a.userId),
    }));
  res.json(eventAttendees);
});

// --- Mark present (admin) ---
app.put("/attendance/:id/present", async (req, res) => {
  await delay(200);
  const attendance = readData("attendance");
  const record = attendance.find((a) => a.id == req.params.id);
  if (!record) return res.status(404).json({ message: "Record not found" });
  record.status = "present";
  writeData("attendance", attendance);
  res.json(record);
});

// --- User registered events ---
app.get("/users/:id/events", async (req, res) => {
  await delay(200);
  const attendance = readData("attendance");
  const events = readData("events");
  const userEvents = attendance
    .filter((a) => a.userId == req.params.id)
    .map((a) => ({
      ...a,
      event: events.find((e) => e.id == a.eventId),
    }));
  res.json(userEvents);
});

// --- Feedback ---
app.post("/events/:id/feedback", async (req, res) => {
  await delay(200);
  const feedbackArr = readData("feedback");
  const id = feedbackArr.length + 1;
  const newFeedback = { id, eventId: parseInt(req.params.id), ...req.body };
  feedbackArr.push(newFeedback);
  writeData("feedback", feedbackArr);
  res.json(newFeedback);
});

app.get("/events/:id/feedback", async (req, res) => {
  await delay(200);
  const feedbackArr = readData("feedback");
  res.json(feedbackArr.filter((f) => f.eventId == req.params.id));
});

app.listen(PORT, () =>
  console.log(`Mock backend running at http://localhost:${PORT}`)
);

// Get event details with registered users (admin)
app.get("/admin/events/:id/attendees", async (req, res) => {
  await delay(200);
  const events = readData("events");
  const attendance = readData("attendance");
  const users = readData("users");

  const event = events.find((e) => e.id == req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  // Map attendance for this event
  const attendees = attendance
    .filter((a) => a.eventId == event.id)
    .map((a) => ({
      id: a.id,
      status: a.status,
      user: users.find((u) => u.id == a.userId),
    }));

  res.json({ ...event, attendees });
});

// Mark multiple attendees as present
app.put("/attendance/present", async (req, res) => {
  await delay(200);
  const { attendanceIds } = req.body;
  if (!Array.isArray(attendanceIds) || attendanceIds.length === 0) {
    return res.status(400).json({ message: "attendanceIds array required" });
  }

  const attendance = readData("attendance");
  const updatedRecords = [];

  attendanceIds.forEach((id) => {
    const record = attendance.find((a) => a.id == id);
    if (record) {
      record.status = "present";
      updatedRecords.push(record);
    }
  });

  writeData("attendance", attendance);
  res.json({ updatedRecords });
});
