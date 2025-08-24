# FROM node:20 

# WORKDIR /app
# COPY package*.json ./
# COPY tsconfig.json ./
# RUN npm install
# COPY src/ ./src/
# RUN npm run build
# RUN mkdir -p dist/swagger && \
#     cp src/swagger/swagger.yaml dist/swagger/ && \
#     cp src/swagger/swagger.json dist/swagger/
# RUN echo "=== Verifying swagger files in dist ===" && \
#     ls -la dist/swagger/

# EXPOSE 3000
# CMD ["npm", "start"]
# Use Node.js 20 (recommended for @supabase/supabase-js v2+)
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy dependency-related files first for better Docker caching
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Build TypeScript project (also copies swagger files)
RUN npm run build

# Create and verify the Swagger files in the dist directory
RUN mkdir -p dist/swagger && \
    cp src/swagger/swagger.yaml dist/swagger/ && \
    cp src/swagger/swagger.json dist/swagger/ && \
    echo "=== Swagger files in dist/swagger ===" && \
    ls -la dist/swagger/

# Expose the port your app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

# FROM node:18-alpine as build
# # FROM node:18 as build
# WORKDIR /usr/local/app
# COPY ./ /usr/local/app

# RUN npm install

# EXPOSE 3000

# CMD ["node", "dist/app.js"]