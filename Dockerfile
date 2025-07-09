FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM node:20-slim AS production

# Install serve package globally
RUN npm install -g serve

# Create a non-root user
RUN useradd -m appuser

# Set working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/build ./build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]