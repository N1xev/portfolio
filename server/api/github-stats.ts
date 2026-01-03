export default defineEventHandler(async (event) => {
    const CACHE_KEY = 'github:stats:v2'
    const CACHE_TTL = 24 * 60 * 60

    const cached = await useStorage().getItem(CACHE_KEY)
    if (cached) {
        setHeader(event, 'Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')
        return cached
    }

    const config = useRuntimeConfig()
    const username = config.public.githubUsername
    const token = config.githubToken

    try {
        const orgs: { login: string }[] = await $fetch('https://api.github.com/user/orgs', {
            headers: {
                Authorization: `token ${token}`,
                'User-Agent': 'Samouly'
            }
        })

        const orgLogins = orgs.map(org => org.login)

        const fetchAllRepos = async () => {
            const allRepos: any[] = []
            let page = 1

            while (true) {
                const repos: any[] = await $fetch(
                    `https://api.github.com/user/repos?per_page=100&page=${page}`,
                    {
                        headers: {
                            Authorization: `token ${token}`,
                            'User-Agent': 'Samouly'
                        }
                    }
                )
                if (repos.length === 0) break
                allRepos.push(...repos)
                if (repos.length < 100) break
                page++
            }

            for (const org of orgLogins) {
                page = 1
                while (true) {
                    const orgRepos: any[] = await $fetch(
                        `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}`,
                        {
                            headers: {
                                Authorization: `token ${token}`,
                                'User-Agent': 'Samouly'
                            }
                        }
                    )
                    if (orgRepos.length === 0) break
                    allRepos.push(...orgRepos)
                    if (orgRepos.length < 100) break
                    page++
                }
            }
            return allRepos
        }

        const allRepos = await fetchAllRepos()
        const uniqueRepos = allRepos.filter(
            (repo, index, self) => index === self.findIndex(r => r.id === repo.id)
        )

        const totalStars = uniqueRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)

        const sortedRepos = uniqueRepos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 50)

        const languagesMap: Record<string, number> = {}
        for (const repo of sortedRepos) {
            if (repo.language) {
                languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1
            }
        }

        const topLanguages = Object.entries(languagesMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([lang]) => lang)

        const query = `
            query {
                user(login: "${username}") {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        `

        const graphqlResponse: any = await $fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Samouly'
            },
            body: {query}
        })

        const calendar = graphqlResponse.data.user.contributionsCollection.contributionCalendar
        const contributions = calendar.weeks.flatMap((week: any) =>
            week.contributionDays.map((day: any) => ({
                date: day.date,
                count: day.contributionCount
            }))
        )

        const result = {
            stats: {
                repos: uniqueRepos.length,
                stars: totalStars,
                contributions: calendar.totalContributions,
                languages: topLanguages,
                organizations: orgLogins
            },
            contributions,
            cachedAt: new Date().toISOString()
        }

        await useStorage().setItem(CACHE_KEY, result, {ttl: CACHE_TTL})

        setHeader(event, 'Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')
        return result

    } catch (error: any) {
        console.error('GitHub API Error:', {
            message: error?.message,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            data: error?.data,
            hasToken: !!token,
            tokenPrefix: token ? token.substring(0, 10) + '...' : 'NO TOKEN'
        })

        if (cached) {
            setHeader(event, 'X-Cache', 'STALE')
            return cached
        }

        throw createError({
            statusCode: 503,
            message: `GitHub data temporarily unavailable: ${error?.message || 'Unknown error'}`
        })
    }
})