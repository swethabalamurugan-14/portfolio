class GitHubAPIException(Exception):
    """Base exception for GitHub API errors."""
    pass

class GitHubRateLimitException(GitHubAPIException):
    """Raised when GitHub API rate limit is exceeded."""
    pass

class GitHubRepositoryNotFound(GitHubAPIException):
    """Raised when the requested GitHub repository does not exist."""
    pass

class GitHubInvalidURLError(GitHubAPIException):
    """Raised when the provided GitHub URL is invalid or malformed."""
    pass
