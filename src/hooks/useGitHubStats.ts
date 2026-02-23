import { useState, useEffect } from "react";

/**
 * GitHub User Statistics
 * 
 * 📚 LEARNING NOTES:
 * This interface defines the shape of data we expect from the GitHub API.
 * TypeScript interfaces help catch errors early and provide better IDE support.
 */
interface GitHubStats {
    publicRepos: number;
    followers: number;
    following: number;
    avatarUrl: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    createdAt: string;
}

interface GitHubRepo {
    name: string;
    description: string | null;
    language: string | null;
    stargazersCount: number;
    forksCount: number;
    htmlUrl: string;
    updatedAt: string;
}

interface UseGitHubStatsResult {
    stats: GitHubStats | null;
    repos: GitHubRepo[];
    languages: Record<string, number>;
    isLoading: boolean;
    error: string | null;
}

/**
 * useGitHubStats - Custom hook for fetching GitHub profile data
 * 
 * 📚 LEARNING NOTES:
 * 
 * 1. CUSTOM HOOKS: Functions starting with "use" that can use React hooks inside them.
 *    They let you extract and reuse stateful logic between components.
 * 
 * 2. ASYNC/AWAIT: Modern way to handle promises (asynchronous operations).
 *    - `async` functions always return a Promise
 *    - `await` pauses execution until the Promise resolves
 * 
 * 3. useEffect CLEANUP: The returned function runs when:
 *    - Component unmounts
 *    - Before effect runs again (if deps change)
 *    We use it to prevent state updates on unmounted components.
 * 
 * 4. ERROR HANDLING: Always wrap API calls in try/catch to handle failures gracefully.
 * 
 * @param username - GitHub username to fetch stats for
 */
export function useGitHubStats(username: string): UseGitHubStatsResult {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [languages, setLanguages] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // AbortController allows us to cancel fetch requests
        // Useful when component unmounts before request completes
        const abortController = new AbortController();

        async function fetchGitHubData() {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch user profile data
                // The GitHub API is public and doesn't require auth for basic requests
                // Rate limit: 60 requests/hour for unauthenticated requests
                const userResponse = await fetch(
                    `https://api.github.com/users/${username}`,
                    { signal: abortController.signal }
                );

                if (!userResponse.ok) {
                    throw new Error(
                        userResponse.status === 404
                            ? "GitHub user not found"
                            : `GitHub API error: ${userResponse.status}`
                    );
                }

                const userData = await userResponse.json();

                // Transform snake_case (API) to camelCase (our convention)
                // This is a common pattern when working with external APIs
                setStats({
                    publicRepos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following,
                    avatarUrl: userData.avatar_url,
                    bio: userData.bio,
                    company: userData.company,
                    location: userData.location,
                    createdAt: userData.created_at,
                });

                // Fetch public repositories (sorted by most recently updated)
                const reposResponse = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
                    { signal: abortController.signal }
                );

                if (reposResponse.ok) {
                    const reposData = await reposResponse.json();

                    // Transform and filter repo data
                    const transformedRepos: GitHubRepo[] = reposData.map((repo: Record<string, unknown>) => ({
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        stargazersCount: repo.stargazers_count,
                        forksCount: repo.forks_count,
                        htmlUrl: repo.html_url,
                        updatedAt: repo.updated_at,
                    }));

                    setRepos(transformedRepos);

                    // Count language usage across all repos
                    // This is a "reduce" pattern - accumulating values into a single result
                    const langCount: Record<string, number> = {};
                    reposData.forEach((repo: Record<string, unknown>) => {
                        const lang = repo.language as string | null;
                        if (lang) {
                            langCount[lang] = (langCount[lang] || 0) + 1;
                        }
                    });
                    setLanguages(langCount);
                }

            } catch (err) {
                // Only set error if it's not an abort (user navigated away)
                if (err instanceof Error && err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                // Always runs, whether success or error
                setIsLoading(false);
            }
        }

        if (username) {
            fetchGitHubData();
        }

        // Cleanup function - runs on unmount or when username changes
        return () => {
            abortController.abort();
        };
    }, [username]); // Dependency array: re-run effect when username changes

    return { stats, repos, languages, isLoading, error };
}

export default useGitHubStats;
