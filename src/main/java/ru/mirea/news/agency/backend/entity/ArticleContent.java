package ru.mirea.news.agency.backend.entity;

import ru.mirea.news.agency.backend.model.AuditModel;

import javax.persistence.*;

@Entity
@Table(name = "content")
public class ArticleContent extends AuditModel {
    @Id
    @GeneratedValue(generator = "article_generator")
    @SequenceGenerator(
            name = "article_generator",
            sequenceName = "article_sequence",
            initialValue = 1000
    )
    private Long id;
    private String type;

    @Column(length = 2048)
    private String value = null;

    @Column(length = 2048)
    private String url = null;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
