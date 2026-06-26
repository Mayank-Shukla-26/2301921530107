const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpbWxld3MyMzAyQGdsYml0bS5hYy5pbiIsImV4cCI6MTc4MjQ1NDIwMywiaWF0IjoxNzgyNDUzMzAzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmZmMzQ4ZGUtZDdjYi00Yzk0LWIxM2ItMzBhYTA2YjQyNmNiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWF5YW5rIHNodWtsYSIsInN1YiI6ImI0YzY2NDRjLTFhZTktNDVjOS1hYzRkLTM3MDUwNGEwNTY2OCJ9LCJlbWFpbCI6ImNzYWltbGV3czIzMDJAZ2xiaXRtLmFjLmluIiwibmFtZSI6Im1heWFuayBzaHVrbGEiLCJyb2xsTm8iOiIyMzAxOTIxNTMwMTA3IiwiYWNjZXNzQ29kZSI6Inh4a0puayIsImNsaWVudElEIjoiYjRjNjY0NGMtMWFlOS00NWM5LWFjNGQtMzcwNTA0YTA1NjY4IiwiY2xpZW50U2VjcmV0IjoieXhKV1BYeFBId3d5amFORSJ9.XoW3JWXKQrmZhPEQxUsXDtIZEquZY7hM0LJi1M2uaLs";

const WEIGHT = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

async function fetchNotifications() {
  const res = await fetch("http://4.224.186.213/evaluation-service/notifications", {
    headers: { "Authorization": `Bearer ${ACCESS_TOKEN}` }
  });
  const data = await res.json();
  
  // Debug: see what we actually get
  console.log("Raw API response:", JSON.stringify(data, null, 2));
  
  // Handle different possible structures
  const notifications = data.notifications || data.data || data || [];
  return Array.isArray(notifications) ? notifications : [];
}

function getPriorityScore(notification) {
  const weight = WEIGHT[notification.Type] || 0;
  const recency = new Date(notification.Timestamp).getTime();
  return { ...notification, score: weight * 1e13 + recency };
}

async function getTop10PriorityNotifications(n = 10) {
  try {
    const notifications = await fetchNotifications();
    console.log(`\nTotal notifications: ${notifications.length}`);
    
    const scored = notifications.map(getPriorityScore);
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, n);

    console.log(`\n=== TOP ${n} PRIORITY NOTIFICATIONS ===\n`);
    top.forEach((item, i) => {
      console.log(`${i + 1}. [${item.Type}] ${item.Message} — ${item.Timestamp}`);
    });
    return top;
  } catch (err) {
    console.error("Error:", err.message);
  }
}

getTop10PriorityNotifications(10);