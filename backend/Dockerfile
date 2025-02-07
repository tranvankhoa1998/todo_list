# Sử dụng Node.js image nhẹ
FROM node:18-alpine

# Set thư mục làm việc
WORKDIR /app

# Copy file package.json trước, giúp tối ưu caching
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng 3000
EXPOSE 3000

# Lệnh khởi chạy server
CMD ["npm", "start"]