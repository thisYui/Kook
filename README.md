# Hướng dẫn Cài đặt và Chạy Project

## Yêu cầu hệ thống

- Node.js >= 18.x
- PostgreSQL >= 14.x
- MongoDB >= 5.x
- npm hoặc yarn

## Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd Kook
```

### 2. Cài đặt dependencies

#### Backend
```bash
cd src/backend
npm install
```

#### Frontend
```bash
cd src/frontend
npm install
```

### 3. Cấu hình Database

#### 3.1. PostgreSQL

##### Tạo database
```sql
-- Kết nối vào PostgreSQL
psql -U postgres

-- Tạo database
CREATE DATABASE kook_db;

-- Tạo user (optional)
CREATE USER kook_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE kook_db TO kook_user;

-- Thoát
\q
```

##### Cấu hình biến môi trường
Tạo file `.env` trong folder `src/backend`:

```env
# Database
DATABASE_URL="postgresql://kook_user:your_password@localhost:5432/kook_db"
MONGODB_URI="mongodb://localhost:27017/kook_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# Email (optional - for production)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@kook.com"

# Client URL
CLIENT_URL="http://localhost:5173"
```

#### 3.2. MongoDB

##### Khởi động MongoDB
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

##### Kết nối và tạo database (tự động tạo khi chạy app)
```bash
mongosh
use kook_db
```

### 4. Chạy Migration (PostgreSQL)

```bash
cd src/backend

# Cài đặt Prisma CLI (nếu chưa có)
npm install -D prisma

# Cài đặt Prisma Client
npm install @prisma/client

# Chạy migration để tạo schema
npx prisma migrate dev --name init_schema

# Generate Prisma Client
npx prisma generate
```

### 5. Seed dữ liệu mẫu (Optional)

```bash
cd src/backend
npm run seed
```

## Chạy ứng dụng

### Development Mode

#### Terminal 1 - Backend
```bash
cd src/backend
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

#### Terminal 2 - Frontend
```bash
cd src/frontend
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### Production Mode

#### Build Backend
```bash
cd src/backend
npm run build
npm start
```

#### Build Frontend
```bash
cd src/frontend
npm run build
npm run preview
```

## Chạy trên mạng LAN

### Backend
Sửa file `src/backend/.env`:
```env
PORT=3000
HOST=0.0.0.0
```

Hoặc chạy với script:
```bash
cd src/backend
npm run dev:lan
```

### Frontend
Sửa file `src/frontend/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
```

### Truy cập từ thiết bị khác

1. Tìm địa chỉ IP của máy chủ:
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
```

2. Truy cập từ thiết bị khác:
- Frontend: `http://<IP-ADDRESS>:5173`
- Backend API: `http://<IP-ADDRESS>:3000`

Ví dụ: `http://192.168.1.100:5173`

## Scripts

### Backend (src/backend/package.json)

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "dev:lan": "cross-env HOST=0.0.0.0 nodemon src/index.js",
    "start": "node src/index.js",
    "migrate": "prisma migrate dev",
    "migrate:deploy": "prisma migrate deploy",
    "migrate:reset": "prisma migrate reset",
    "generate": "prisma generate",
    "seed": "node scripts/seed.js",
    "studio": "prisma studio"
  }
}
```

### Frontend (src/frontend/package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "dev:lan": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

## Prisma Commands

### Migration
```bash
# Tạo migration mới
npx prisma migrate dev --name <migration-name>

# Apply migrations trong production
npx prisma migrate deploy

# Reset database (xóa toàn bộ dữ liệu)
npx prisma migrate reset

# Xem status của migrations
npx prisma migrate status
```

### Prisma Studio (GUI Database)
```bash
npx prisma studio
```
Truy cập tại: `http://localhost:5555`

### Generate Client
```bash
npx prisma generate
```

### Format Schema
```bash
npx prisma format
```

## Troubleshooting

### Lỗi kết nối PostgreSQL
```bash
# Kiểm tra PostgreSQL có chạy không
# Windows
sc query postgresql-x64-14

# Linux
sudo systemctl status postgresql

# Kiểm tra kết nối
psql -U postgres -h localhost
```

### Lỗi kết nối MongoDB
```bash
# Kiểm tra MongoDB có chạy không
# Windows
sc query MongoDB

# Linux
sudo systemctl status mongod

# Kiểm tra kết nối
mongosh
```

### Lỗi Prisma Migration
```bash
# Xóa và tạo lại database
npx prisma migrate reset

# Generate lại client
npx prisma generate
```

### Port đã được sử dụng
```bash
# Windows - Kill process trên port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## Structure

```
Kook/
├── src/
│   ├── backend/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   │   └── mongo/
│   │   │   ├── repositories/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── index.js
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── api/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── layouts/
│       │   └── utils/
│       └── package.json
└── README.md
```

## Tài liệu API

Xem file [API.md](./docs/analysis-and-design/API.md) để biết chi tiết về các endpoints.

## License

MIT

