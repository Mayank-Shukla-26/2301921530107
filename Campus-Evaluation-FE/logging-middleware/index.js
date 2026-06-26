const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpbWxld3MyMzAyQGdsYml0bS5hYy5pbiIsImV4cCI6MTc4MjQ1MjQwNywiaWF0IjoxNzgyNDUxNTA3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTVlOGIxN2QtNzgyMi00NDUzLTg3ZDEtY2I2ZWQ3OWFiZDJlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWF5YW5rIHNodWtsYSIsInN1YiI6ImI0YzY2NDRjLTFhZTktNDVjOS1hYzRkLTM3MDUwNGEwNTY2OCJ9LCJlbWFpbCI6ImNzYWltbGV3czIzMDJAZ2xiaXRtLmFjLmluIiwibmFtZSI6Im1heWFuayBzaHVrbGEiLCJyb2xsTm8iOiIyMzAxOTIxNTMwMTA3IiwiYWNjZXNzQ29kZSI6Inh4a0puayIsImNsaWVudElEIjoiYjRjNjY0NGMtMWFlOS00NWM5LWFjNGQtMzcwNTA0YTA1NjY4IiwiY2xpZW50U2VjcmV0IjoieXhKV1BYeFBId3d5amFORSJ9.k8q2G1AI3G07YjjPlh2zaVi61b44-Ub9z91mTxGY3Aw";

async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Logging failed:", err);
  }
}

module.exports = { Log };