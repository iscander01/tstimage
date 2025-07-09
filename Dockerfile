FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Production stage
FROM node:20-slim AS production

# Install serve package globally
RUN npm install -g serve

# Create a non-root user and switch to it
RUN useradd -m appuser
USER appuser

# Set working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/build ./build

# Expose the port the app runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]