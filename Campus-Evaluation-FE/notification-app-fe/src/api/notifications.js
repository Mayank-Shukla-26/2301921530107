

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpbWxld3MyMzAyQGdsYml0bS5hYy5pbiIsImV4cCI6MTc4MjQ1ODQwMSwiaWF0IjoxNzgyNDU3NTAxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzA0N2Y2YWItMzc4Yi00ZGRiLWEyMzAtODY2OTVhZjVlOTc4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWF5YW5rIHNodWtsYSIsInN1YiI6ImI0YzY2NDRjLTFhZTktNDVjOS1hYzRkLTM3MDUwNGEwNTY2OCJ9LCJlbWFpbCI6ImNzYWltbGV3czIzMDJAZ2xiaXRtLmFjLmluIiwibmFtZSI6Im1heWFuayBzaHVrbGEiLCJyb2xsTm8iOiIyMzAxOTIxNTMwMTA3IiwiYWNjZXNzQ29kZSI6Inh4a0puayIsImNsaWVudElEIjoiYjRjNjY0NGMtMWFlOS00NWM5LWFjNGQtMzcwNTA0YTA1NjY4IiwiY2xpZW50U2VjcmV0IjoieXhKV1BYeFBId3d5amFORSJ9.zRDLTQaR7eYB_mNiEsPXPuJvFidSgFBHRGVWgke2l3E";

export async function fetchNotifications({ page = 1, limit = 10, notification_type = "" } = {}) {
  let url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;
  if (notification_type && notification_type !== "All") {
    url += `&notification_type=${notification_type}`;
  }
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${ACCESS_TOKEN}` }
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return await res.json();
}