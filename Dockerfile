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

# Use a smaller base image for the production stage
FROM node:20-slim AS runner

# Create a non-root user
RUN useradd -m appuser

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Install serve to serve the built application
RUN npm install -g serve

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]