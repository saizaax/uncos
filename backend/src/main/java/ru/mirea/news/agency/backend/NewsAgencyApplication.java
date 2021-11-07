package ru.mirea.news.agency.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NewsAgencyApplication {
    public static void main(String[] args) {
        SpringApplication.run(NewsAgencyApplication.class, args);
    }
}
