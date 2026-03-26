# Complete Example Workflow

### 1. Seed sample data

```bash
node scripts/seedData.js
```

### 2. Start the server

```bash
npm run dev
```

### 3. Get statistics

```bash
curl http://localhost:3000/api/courses/stats
```

### 4. View all courses

```bash
curl http://localhost:3000/api/courses
```

### 5. Check courses in progress

```bash
curl http://localhost:3000/api/courses/status/In%20Progress
```

### 6. Add a new course

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vue.js 3 Masterclass",
    "description": "Build apps with Vue.js composition API",
    "targetCompletionDate": "2024-09-30",
    "status": "Not Started"
  }'
```

### 7. Check updated statistics

```bash
curl http://localhost:3000/api/courses/stats
```
