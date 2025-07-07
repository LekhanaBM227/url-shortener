# ---- Build Stage ----
# Use a specific Maven and JDK version for a reproducible build
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml first to leverage Docker's layer caching
# If pom.xml doesn't change, this layer won't be rebuilt
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application's source code
COPY src ./src

# Package the application, skipping tests for a faster build
RUN mvn package -DskipTests

# ---- Run Stage ----
# Use a minimal JRE image for a smaller final image size
FROM eclipse-temurin:17-jre-focal

# Set the working directory
WORKDIR /app

# Copy the built JAR from the 'build' stage
COPY --from=build /app/target/url-shortener-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# The command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]