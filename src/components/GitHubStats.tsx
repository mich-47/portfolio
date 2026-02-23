import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGitHubStats } from "@/hooks/useGitHubStats";

interface GitHubStatsProps {
    username: string;
}

/**
 * GitHubStats - Displays live GitHub profile statistics
 * 
 * 📚 LEARNING NOTES:
 * 
 * 1. CONDITIONAL RENDERING: We show different UI based on state:
 *    - isLoading → Skeleton placeholders
 *    - error → Error message with retry option
 *    - data → The actual stats
 * 
 * 2. SKELETON LOADING: Placeholder shapes that match the final layout.
 *    This prevents layout shift when data loads.
 * 
 * 3. GRACEFUL DEGRADATION: If API fails, the rest of the site still works.
 *    We show an error message but don't break the whole page.
 */
export function GitHubStats({ username }: GitHubStatsProps) {
    const { stats, repos, languages, isLoading, error } = useGitHubStats(username);

    // Sort languages by usage count (descending)
    const topLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    // Language colors (common languages)
    const languageColors: Record<string, string> = {
        TypeScript: "#3178c6",
        JavaScript: "#f1e05a",
        Python: "#3572A5",
        Rust: "#dea584",
        Go: "#00ADD8",
        Java: "#b07219",
        "C++": "#f34b7d",
        C: "#555555",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Shell: "#89e051",
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <GlassCard className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-muted" />
                        <div className="h-5 w-32 rounded bg-muted" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-8 w-12 rounded bg-muted" />
                                <div className="h-4 w-16 rounded bg-muted" />
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>
        );
    }

    // Error state with graceful fallback
    if (error) {
        return (
            <GlassCard className="p-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Github className="h-5 w-5" />
                    <span className="text-sm">GitHub stats unavailable</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground/70">{error}</p>
            </GlassCard>
        );
    }

    // No data (shouldn't happen, but TypeScript safety)
    if (!stats) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <GlassCard className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Github className="h-5 w-5 text-primary" />
                        <span className="font-mono text-sm uppercase tracking-wider text-foreground/80">
                            GitHub Activity
                        </span>
                    </div>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View GitHub profile"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <p className="font-display text-2xl font-bold text-primary">
                            {stats.publicRepos}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            Repos
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="font-display text-2xl font-bold text-primary">
                            {stats.followers}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            Followers
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="font-display text-2xl font-bold text-primary">
                            {stats.following}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            Following
                        </p>
                    </div>
                </div>

                {/* Top Languages */}
                {topLanguages.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Code2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                Top Languages
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {topLanguages.map(([lang, count]) => (
                                <span
                                    key={lang}
                                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-muted/50"
                                >
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: languageColors[lang] || "#888" }}
                                    />
                                    {lang}
                                    <span className="text-muted-foreground">({count})</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Repos */}
                {repos.length > 0 && (
                    <div>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-3">
                            Recent Activity
                        </span>
                        <div className="space-y-2">
                            {repos.slice(0, 3).map((repo) => (
                                <a
                                    key={repo.name}
                                    href={repo.htmlUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                            {repo.name}
                                        </span>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            {repo.stargazersCount > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3" />
                                                    {repo.stargazersCount}
                                                </span>
                                            )}
                                            {repo.forksCount > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <GitFork className="h-3 w-3" />
                                                    {repo.forksCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {repo.language && (
                                        <span className="inline-flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: languageColors[repo.language] || "#888" }}
                                            />
                                            {repo.language}
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </GlassCard>
        </motion.div>
    );
}

export default GitHubStats;
