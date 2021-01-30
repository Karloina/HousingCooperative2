FROM maven:3.6.3-jdk-11 AS BUILD

WORKDIR /opt/app

ADD src/ src
ADD pom.xml .
RUN mvn install

FROM openjdk:13-jdk-alpine
WORKDIR /opt/app
COPY --from=BUILD /opt/app/target/bill-service.jar ./
RUN mkdir db
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar","bill-service.jar"]