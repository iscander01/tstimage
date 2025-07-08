FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the final stage
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy the build output and package.json
COPY --from=builder /app/build ./build
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Create a non-root user and switch to it
RUN useradd -m appuser
USER appuser

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "start"]