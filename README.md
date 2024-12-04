
# Hướng Dẫn Triển Khai Dự Án

## Tổng Quan
Dự án này sử dụng các công nghệ sau:
- **Backend**: Flask (Python), NestJS (Node.js), Laravel (PHP)
- **Cơ sở dữ liệu**: MongoDB Cloud
- **Frontend**: Next.js

Hướng dẫn này sẽ giúp bạn triển khai dự án một cách chi tiết.

---

## Mục Lục
1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
   - [Backend (Flask)](#backend-flask)
   - [Backend (NestJS)](#backend-nestjs)
   - [Backend (Laravel)](#backend-laravel)
   - [Frontend (Next.js)](#frontend-nextjs)
   - [Cơ Sở Dữ Liệu (MongoDB Cloud)](#cơ-sở-dữ-liệu-mongodb-cloud)
3. [Chạy Dự Án Cục Bộ](#chạy-dự-án-cục-bộ)
4. [Triển Khai Bằng Docker](#triển-khai-bằng-docker)
5. [Triển Khai Trên Môi Trường Production](#triển-khai-trên-môi-trường-production)

---

## Yêu Cầu Hệ Thống
- **Node.js**: v16 trở lên
- **Python**: v3.9 trở lên
- **PHP**: v8.1 trở lên
- **Docker**: Phiên bản mới nhất
- **Tài khoản MongoDB Atlas**

---

## Hướng Dẫn Cài Đặt

### Backend (Flask)
1. Cài đặt các thư viện:
   ```bash
   pip install -r requirements.txt
   ```
2. Chạy ứng dụng:
   ```bash
   gunicorn wsgi:app --bind 0.0.0.0:5000
   ```

### Backend (NestJS)
1. Cài đặt các thư viện:
   ```bash
   npm install
   ```
2. Build và chạy ứng dụng:
   ```bash
   npm run build
   npm run start
   ```

### Backend (Laravel)
1. Cài đặt các thư viện:
   ```bash
   composer install
   ```
2. Cấu hình file `.env` với URI kết nối MongoDB.
3. Chạy migrations:
   ```bash
   php artisan migrate
   ```
4. Chạy server:
   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

### Frontend (Next.js)
1. Cài đặt các thư viện:
   ```bash
   npm install
   ```
2. Build và chạy ứng dụng:
   ```bash
   npm run build
   npm run start
   ```

### Cơ Sở Dữ Liệu (MongoDB Cloud)
1. Tạo một cluster trên [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Lấy URI kết nối và cập nhật vào file `.env` của các backend:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

---

## Chạy Dự Án Cục Bộ
1. Chạy Flask backend trên cổng `5000`.
2. Chạy NestJS backend trên cổng `3001`.
3. Chạy Laravel backend trên cổng `8000`.
4. Chạy Next.js frontend trên cổng `3000`.
5. Truy cập ứng dụng tại `http://localhost:3000`.

---

## Triển Khai Bằng Docker
### Sử Dụng Docker Compose
1. Tạo file `docker-compose.yml`:
   ```yaml
   version: "3.9"
   services:
     flask:
       build:
         context: ./flask
       ports:
         - "5000:5000"

     nestjs:
       build:
         context: ./nestjs
       ports:
         - "3001:3000"

     laravel:
       build:
         context: ./laravel
       ports:
         - "8000:8000"

     nextjs:
       build:
         context: ./nextjs
       ports:
         - "3000:3000"

     mongodb:
       image: mongo
       ports:
         - "27017:27017"
   ```
2. Build và chạy các service:
   ```bash
   docker-compose up -d
   ```

---

## Triển Khai Trên Môi Trường Production
### Backend
1. Triển khai Flask, NestJS, và Laravel lên dịch vụ cloud (AWS, DigitalOcean, hoặc tương tự).
2. Sử dụng **nginx** làm reverse proxy.
3. Cấu hình HTTPS với Let's Encrypt.

### Frontend
1. Triển khai Next.js trên [Vercel](https://vercel.com) hoặc dịch vụ tương tự.

### Database
1. Sử dụng MongoDB Atlas với cấu hình sản xuất.
2. Thiết lập IP Whitelisting và bảo mật tài khoản.

---

## Giấy Phép
Dự án này được cấp phép theo MIT License.

## Liên Hệ
Nếu có vấn đề, hãy mở một issue hoặc liên hệ với nhóm phát triển.
