import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitCommit, AlertCircle, RefreshCw } from 'lucide-react';

export default function GithubSection({ content }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Extract GitHub username from content.social_github or default to 'raflyfp'
    const githubUrl = content.social_github || '';
    const username = useMemo(() => {
        if (githubUrl && githubUrl !== '#') {
            const match = githubUrl.match(/github\.com\/([^/]+)/);
            if (match && match[1]) {
                return match[1];
            } else if (!githubUrl.includes('/') && githubUrl.trim() !== '') {
                return githubUrl.trim();
            }
        }
        return 'raflyfp'; // default fallback
    }, [githubUrl]);

    // Fetch contribution data from Deno live API
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        fetch(`https://github-contributions-api.deno.dev/${username}.json`)
            .then((res) => {
                if (!res.ok) throw new Error('API connection failed');
                return res.json();
            })
            .then((json) => {
                if (isMounted) {
                    if (json && json.contributions) {
                        setData(json);
                    } else {
                        throw new Error('Invalid format received');
                    }
                }
            })
            .catch((err) => {
                console.error('GitHub API Error:', err);
                if (isMounted) {
                    setError(true);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [username, refreshTrigger]);

    // Generate fallback contribution data deterministically if API fails
    const fallbackData = useMemo(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const currentSunday = new Date(today);
        currentSunday.setDate(today.getDate() - dayOfWeek);
        const startDate = new Date(currentSunday);
        startDate.setDate(startDate.getDate() - 52 * 7);

        const days = [];
        for (let i = 0; i < 371; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push({
                date,
                contributionCount: 0,
                contributionLevel: 'NONE',
                isFuture: date > today,
            });
        }

        const jan1 = new Date('2026-01-01');
        const activeDays = days.filter((d) => d.date >= jan1 && d.date <= today);

        let seed = 42;
        function lcg() {
            seed = (seed * 1664525 + 1013904223) % 4294967296;
            return seed / 4294967296;
        }

        let distributed = 0;
        const targetCount = 112;
        while (distributed < targetCount && activeDays.length > 0) {
            const randIndex = Math.floor(lcg() * activeDays.length);
            const day = activeDays[randIndex];
            if (day.contributionCount < 4) {
                day.contributionCount++;
                day.contributionLevel =
                    day.contributionCount === 1 ? 'FIRST_QUARTILE' :
                    day.contributionCount === 2 ? 'SECOND_QUARTILE' :
                    day.contributionCount === 3 ? 'THIRD_QUARTILE' : 'FOURTH_QUARTILE';
                distributed++;
            }
        }

        return days;
    }, []);

    const fallbackMonthLabels = useMemo(() => {
        const labels = [];
        let lastMonth = -1;
        for (let i = 0; i < 53; i++) {
            const sundayDate = fallbackData[i * 7].date;
            const month = sundayDate.getMonth();
            if (month !== lastMonth) {
                labels.push({
                    index: i,
                    label: sundayDate.toLocaleDateString('en-US', { month: 'short' }),
                });
                lastMonth = month;
            }
        }
        const filteredLabels = [];
        labels.forEach((label) => {
            if (filteredLabels.length === 0 || label.index - filteredLabels[filteredLabels.length - 1].index >= 3) {
                filteredLabels.push(label);
            }
        });
        return filteredLabels;
    }, [fallbackData]);

    // Parse the fetched live data
    const parsedData = useMemo(() => {
        if (!data || !data.contributions) {
            return { flatDays: [], monthLabels: [], totalCount: 0 };
        }
        const flat = data.contributions.flat();

        const labels = [];
        let lastMonth = -1;
        data.contributions.forEach((week, colIndex) => {
            if (week && week[0]) {
                const dateObj = new Date(week[0].date);
                const month = dateObj.getMonth();
                if (month !== lastMonth) {
                    labels.push({
                        index: colIndex,
                        label: dateObj.toLocaleDateString('en-US', { month: 'short' }),
                    });
                    lastMonth = month;
                }
            }
        });

        const filteredLabels = [];
        labels.forEach((label) => {
            if (filteredLabels.length === 0 || label.index - filteredLabels[filteredLabels.length - 1].index >= 3) {
                filteredLabels.push(label);
            }
        });

        const total = flat.reduce((sum, day) => sum + (day.contributionCount || 0), 0);

        return { flatDays: flat, monthLabels: filteredLabels, totalCount: total };
    }, [data]);

    // Choose final data source
    const finalDays = error ? fallbackData : parsedData.flatDays;
    const finalMonthLabels = error ? fallbackMonthLabels : parsedData.monthLabels;
    const finalTotal = error ? 112 : parsedData.totalCount;

    // Helper to map levels to CSS variables
    const getLevel = (day) => {
        if (day.isFuture) return -1;
        const lvl = day.contributionLevel;
        if (!lvl || lvl === 'NONE' || day.contributionCount === 0) return 0;
        if (lvl === 'FIRST_QUARTILE') return 1;
        if (lvl === 'SECOND_QUARTILE') return 2;
        if (lvl === 'THIRD_QUARTILE') return 3;
        if (lvl === 'FOURTH_QUARTILE') return 4;
        return 1;
    };

    return (
        <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
                >
                    {/* Background Glow */}
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl" />

                    {/* Top Header Row */}
                    <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                                <GitCommit className="h-4.5 w-4.5 animate-pulse" />
                            </span>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-sm font-semibold text-white">
                                        {loading ? 'Fetching data...' : `${finalTotal} contributions in the last year`}
                                    </h3>
                                    {!loading && (
                                        <a
                                            href={`https://github.com/${username}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition cursor-pointer"
                                        >
                                            @{username}
                                        </a>
                                    )}
                                </div>
                                <p className="text-[10px] text-zinc-500">
                                    {error ? 'Simulasi aktivitas (koneksi API gagal)' : 'Data kontribusi langsung dari repositori publik'}
                                </p>
                            </div>
                        </div>

                        {/* Top Right Actions */}
                        <div className="flex items-center gap-2">
                            {error && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium bg-amber-400/5 border border-amber-400/10 px-2 py-1 rounded-lg">
                                    <AlertCircle className="h-3 w-3" />
                                    Offline Mode
                                </span>
                            )}
                            <button
                                onClick={() => setRefreshTrigger((prev) => prev + 1)}
                                disabled={loading}
                                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/[0.055] text-white hover:bg-cyan-200/10 transition disabled:opacity-50 cursor-pointer"
                                title="Refresh Data"
                            >
                                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Body */}
                    <div className="mt-6 relative z-10 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {loading ? (
                            <div className="min-w-[690px] py-2 px-1">
                                <div className="animate-pulse">
                                    <div className="grid grid-cols-[32px_1fr] gap-2 mb-2">
                                        <div />
                                        <div className="h-4 bg-white/5 rounded w-1/4" />
                                    </div>
                                    <div className="grid grid-cols-[32px_1fr] gap-2 items-center">
                                        <div className="grid grid-rows-7 gap-[3px] h-[88px] text-[10px] text-zinc-500 font-medium justify-items-start">
                                            <span></span>
                                            <span>Mon</span>
                                            <span></span>
                                            <span>Wed</span>
                                            <span></span>
                                            <span>Fri</span>
                                            <span></span>
                                        </div>
                                        <div className="grid grid-flow-col grid-rows-7 gap-[3px] h-[88px]">
                                            {[...Array(371)].map((_, i) => (
                                                <div key={i} className="h-[10px] w-[10px] bg-white/5 rounded-[2px]" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="min-w-[690px] py-2 px-1">
                                {/* Months Header */}
                                <div className="grid grid-cols-[32px_1fr] gap-2 mb-2 select-none">
                                    <div />
                                    <div className="relative h-4">
                                        {finalMonthLabels.map((ml, i) => (
                                            <span
                                                key={i}
                                                className="absolute text-[9px] font-medium text-zinc-500"
                                                style={{ left: `${(ml.index / 53) * 100}%` }}
                                            >
                                                {ml.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Calendar Grid Row */}
                                <div className="grid grid-cols-[32px_1fr] gap-2 items-center">
                                    {/* Days labels */}
                                    <div className="grid grid-rows-7 gap-[3px] text-[9px] text-zinc-500 font-medium h-[88px] justify-items-start select-none">
                                        <span></span>
                                        <span>Mon</span>
                                        <span></span>
                                        <span>Wed</span>
                                        <span></span>
                                        <span>Fri</span>
                                        <span></span>
                                    </div>

                                    {/* Contribution cells */}
                                    <div className="grid grid-flow-col grid-rows-7 gap-[3px] h-[88px] relative">
                                        {finalDays.map((day, idx) => {
                                            const formattedDate = day.date instanceof Date 
                                                ? day.date 
                                                : new Date(day.date);
                                            const dateStr = formattedDate.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            });
                                            const count = day.contributionCount || 0;
                                            const countLabel = count === 0 ? 'No' : count;
                                            const contribText = `${countLabel} contribution${count !== 1 ? 's' : ''} on ${dateStr}`;
                                            const level = getLevel(day);

                                            if (level === -1) {
                                                return <div key={idx} className="h-[10px] w-[10px] opacity-0 pointer-events-none" />;
                                            }

                                            return (
                                                <div
                                                    key={idx}
                                                    style={{ backgroundColor: `var(--contribution-level-${level})` }}
                                                    className="h-[10px] w-[10px] rounded-[2px] transition-all duration-100 cursor-pointer hover:scale-125 hover:z-20"
                                                    onMouseEnter={(e) => {
                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                        const gridRect = e.currentTarget.parentElement.getBoundingClientRect();
                                                        setHoveredDay({
                                                            text: contribText,
                                                            x: rect.left - gridRect.left + 5,
                                                            y: rect.top - gridRect.top - 34,
                                                        });
                                                    }}
                                                    onMouseLeave={() => setHoveredDay(null)}
                                                />
                                            );
                                        })}

                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {hoveredDay && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 3 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 3 }}
                                                    transition={{ duration: 0.08 }}
                                                    className="absolute z-30 pointer-events-none bg-zinc-950 border border-white/10 text-white text-[9px] px-2 py-1 rounded-md shadow-lg font-medium whitespace-nowrap -translate-x-1/2"
                                                    style={{
                                                        left: hoveredDay.x,
                                                        top: hoveredDay.y,
                                                    }}
                                                >
                                                    {hoveredDay.text}
                                                    {/* Arrow */}
                                                    <div className="absolute left-1/2 -bottom-[3px] -translate-x-1/2 w-1.5 h-1.5 bg-zinc-950 border-r border-b border-white/10 rotate-45" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Legend Row */}
                    <div className="relative z-10 mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between text-[10px] text-zinc-500">
                        <a
                            href="https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-white transition duration-200 cursor-pointer"
                        >
                            Learn how we count contributions
                            <ExternalLink className="h-3 w-3" />
                        </a>

                        <div className="flex items-center gap-1.5 select-none">
                            <span>Less</span>
                            <div className="flex gap-[3px]">
                                {[0, 1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        style={{ backgroundColor: `var(--contribution-level-${level})` }}
                                        className="h-[10px] w-[10px] rounded-[2px]"
                                    />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
