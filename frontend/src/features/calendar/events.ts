// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create events for a given date
function createEventsForDate(date) {
  const eventsForDate = [];
  const startTimes = [9, 12, 14, 10.5, 15.5]; // Fixed start times for events

  startTimes.forEach((startTime) => {
    const startHour = Math.floor(startTime);
    const startMinute = Math.floor((startTime - startHour) * 60);
    const startDate = new Date(date);
    startDate.setHours(startHour, startMinute);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    eventsForDate.push({
      title: "Event",
      start: new Date(startDate),
      end: new Date(endDate),
      serviceId: getRandomInt(1, 5), // Random serviceId between 1 and 10
    });
  });

  return eventsForDate;
}

// Get current date
const currentDate = new Date();

// Create events for the current day and the next three days
const events = [];
for (let i = 0; i < 8; i++) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() + i);
  events.push(...createEventsForDate(date));
}

export { events };
