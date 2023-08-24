FROM openjdk:17-jdk-slim

VOLUME /tmp

RUN groupadd -g 999 appuser && useradd -r -u 999 -g appuser appuser

USER appuser

COPY target/CineFlix-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT exec java -server -Djava.security.egd=file:/dev/./urandom $JAVA_OPTS -jar /app.jar