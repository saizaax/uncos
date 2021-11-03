package ru.mirea.news.agency.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.mirea.news.agency.backend.entity.Article;
import ru.mirea.news.agency.backend.exception.ResourceNotFoundException;
import ru.mirea.news.agency.backend.repository.ArticleRepository;
import ru.mirea.news.agency.backend.repository.specs.ArticleSpecification;
import ru.mirea.news.agency.backend.repository.specs.SearchCriteria;
import ru.mirea.news.agency.backend.repository.specs.SearchOperation;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {

    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping()
    public Page<Article> getArticles(Pageable pageable, Authentication authentication,
                                     @RequestParam(required = false) String published,
                                     @RequestParam(required = false) String search) {

        ArticleSpecification specification = new ArticleSpecification();

        if (search != null && !search.equals("") && !search.equals(" "))
            specification.add(new SearchCriteria("search", search, SearchOperation.SEARCH));

        if (published != null && published.equals("false") && authentication != null && (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_MODERATOR")) ||
                authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))))
            return articleRepository.findAll(specification,
                    PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id")));

        specification.add(new SearchCriteria("published", true, SearchOperation.EQUAL));
        return articleRepository.findAll(specification,
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id")));
    }

    @GetMapping("/category/{articleCategory}")
    public Page<Article> getArticlesByCategory(Pageable pageable, Authentication authentication,
                                               @PathVariable String articleCategory,
                                               @RequestParam(required = false) String published,
                                               @RequestParam(required = false) String search) {

        ArticleSpecification specification = new ArticleSpecification();

        if (search != null && !search.equals("") && !search.equals(" "))
            specification.add(new SearchCriteria("search", search, SearchOperation.SEARCH));

        specification.add(new SearchCriteria("tags", articleCategory, SearchOperation.IS_MEMBER));

        if (published != null && published.equals("false") && authentication != null && (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_MODERATOR")) ||
                authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))))
            return articleRepository.findAll(specification,
                    PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id")));

        specification.add(new SearchCriteria("published", true, SearchOperation.EQUAL));
        return articleRepository.findAll(specification,
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id")));
    }

    @GetMapping("/id/{articleId}")
    public Article getArticlesById(@PathVariable Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + articleId));
    }

    @PostMapping()
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Article createArticle(@Valid @RequestBody Article article) {
        return articleRepository.save(article);
    }

    @PutMapping("/id/{articleId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Article updateArticle(@PathVariable Long articleId,
                                 @Valid @RequestBody Article articleRequest) {
        return articleRepository.findById(articleId)
                .map(article -> {
                    article.setTitle(articleRequest.getTitle());
                    article.setPublished(articleRequest.getPublished());
                    article.setAuthor(articleRequest.getAuthor());
                    article.setContent(articleRequest.getContent());
                    article.setPreview(articleRequest.getPreview());
                    article.setSubtitle(articleRequest.getSubtitle());
                    article.setTags(articleRequest.getTags());
                    return articleRepository.save(article);
                }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + articleId));
    }

    @DeleteMapping("/id/{articleId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteArticle(@PathVariable Long articleId) {
        return articleRepository.findById(articleId)
                .map(article -> {
                    articleRepository.delete(article);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Article not found with id " + articleId));
    }
}
