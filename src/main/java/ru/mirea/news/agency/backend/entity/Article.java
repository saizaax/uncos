package ru.mirea.news.agency.backend.entity;

import ru.mirea.news.agency.backend.model.AuditModel;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "articles")
public class Article extends AuditModel {
    @Id
    @GeneratedValue(generator = "article_generator")
    @SequenceGenerator(
            name = "article_generator",
            sequenceName = "article_sequence",
            initialValue = 1000
    )
    private Long id;
    private Boolean published;
    private String author;

    @NotBlank
    @Column(length = 2048)
    private String title;

    @NotBlank
    @Column(length = 2048)
    private String subtitle;

    @Column(length = 2048)
    private String preview;

    @ElementCollection
    private List<String> tags;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "content_id")
    private List<ArticleContent> content;

    public List<ArticleContent> getContent() {
        return content;
    }

    public void setContent(List<ArticleContent> content) {
        this.content = content;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
