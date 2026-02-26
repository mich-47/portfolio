import React from "react";
import { cn } from "@/lib/utils";

interface CodeMockupProps {
    code: string;
    language: string;
    filename?: string;
    className?: string;
}

/**
 * CodeMockup - Displays authentic-looking code snippets instead of generic images
 * This gives the portfolio a much more professional, "expert developer" aesthetic.
 */
export function CodeMockup({ code, language, filename, className }: CodeMockupProps) {
    // Simple syntax highlighting heuristic for a clean, minimal look without heavy library overhead
    const highlightCode = (text: string) => {
        if (language === "python") {
            return text
                .replace(/\b(import|from|def|class|if|else|elif|return|True|False|None|self|async|await)\b/g, '<span class="text-primary">$1</span>')
                .replace(/("[^"]*"|'[^']*')/g, '<span class="text-green-400">$1</span>')
                .replace(/\b(print|len|range)\b/g, '<span class="text-blue-400">$1</span>')
                .replace(/#.*$/gm, '<span class="text-muted-foreground">$&</span>');
        }
        if (language === "terminal") {
            return text
                .replace(/^(\$\s)(.*)$/gm, '<span class="text-muted-foreground">$1</span><span class="text-foreground">$2</span>')
                .replace(/\[OK\]|SUCCESS/g, '<span class="text-green-400">$&</span>')
                .replace(/\[WARN\]/g, '<span class="text-yellow-400">$&</span>')
                .replace(/\[ERROR\]/g, '<span class="text-red-400">$&</span>');
        }
        return text; // Fallback
    };

    return (
        <div className={cn("flex h-full w-full flex-col overflow-hidden bg-[#0d1117] font-mono text-xs text-foreground/90", className)}>
            {/* Mac-style Window Header */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-[#161b22] px-4 py-2">
                <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                {filename && (
                    <div className="ml-2 text-[10px] tracking-wider text-muted-foreground/70">
                        {filename}
                    </div>
                )}
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4">
                <pre className="m-0 bg-transparent p-0 leading-relaxed">
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
                </pre>
            </div>
        </div>
    );
}

export default CodeMockup;
