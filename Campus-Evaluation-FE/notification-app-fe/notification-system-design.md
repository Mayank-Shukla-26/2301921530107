# Stage 1

## Priority Inbox — Approach & Design

### Problem Statement
The campus notification platform receives a high volume of notifications (Placements, Results, Events). Users lose track of important ones. The goal is to implement a **Priority Inbox** that always displays the top 'n' most important unread notifications first.

### Priority Logic

Priority is determined by two factors:

**1. Type Weight (higher = more important)**
| Type | Weight |
|------|--------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

**2. Recency**
Among notifications of the same type, newer ones rank higher.

### Score Formula
priority_score = (type_weight × 10^13) + timestamp_in_milliseconds

This ensures type always dominates, and recency breaks ties within the same type.

### Maintaining Top N Efficiently
As new notifications keep coming in, instead of re-sorting all notifications every time:
- Use a **Min-Heap of size N**
- For each new notification, compute its score
- If score > heap minimum, replace the minimum
- This gives O(log N) insertion vs O(M log M) full sort
- Result: always maintain top N in near real-time

### Output — Top 10 Priority Notifications

| Rank | Type | Message | Timestamp |
|------|------|---------|-----------|
| 1 | Placement | Marriott International Inc. hiring | 2026-06-26 05:25:19 |
| 2 | Placement | Apple Inc. hiring | 2026-06-25 23:23:40 |
| 3 | Placement | Marriott International Inc. hiring | 2026-06-25 18:23:58 |
| 4 | Placement | Booking Holdings Inc. hiring | 2026-06-25 17:53:31 |
| 5 | Placement | Broadcom Inc. hiring | 2026-06-25 06:54:07 |
| 6 | Placement | Amgen Inc. hiring | 2026-06-25 06:25:37 |
| 7 | Placement | Nvidia Corporation hiring | 2026-06-25 05:54:25 |
| 8 | Result | end-sem | 2026-06-25 20:55:28 |
| 9 | Result | project-review | 2026-06-25 19:53:22 |
| 10 | Result | internal | 2026-06-25 18:55:10 |