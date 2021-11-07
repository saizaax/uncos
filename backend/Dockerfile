FROM adoptopenjdk/openjdk14:alpine-jre

FROM maven:latest AS maven

WORKDIR /usr/src/backend
COPY . /usr/src/backend

RUN mvn package -DskipTests

FROM adoptopenjdk/openjdk14:alpine-jre

ARG JAR_FILE=news-agency-backend.jar
WORKDIR /opt/backend

COPY --from=maven /usr/src/backend/target/${JAR_FILE} /opt/backend/

ENTRYPOINT ["java","-jar","news-agency-backend.jar"]