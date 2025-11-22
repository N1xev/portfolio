export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const username = config.public.githubUsername
    const token = config.githubToken

    try {
        const user = await $fetch(`https://api.github.com/users/${username}`, {
            headers: {Authorization: `token ${token}`}
        })

        const orgs: { login: string }[] = await $fetch(`https://api.github.com/user/orgs`, {
            headers: {Authorization: `token ${token}`}
        })

        const orgLogins = orgs.map(org => org.login)

        const fetchAllRepos = async () => {
            const allRepos: any[] = []

            let page = 1
            while (true) {
                const repos: any[] = await $fetch(
                    `https://api.github.com/user/repos?per_page=100&page=${page}`,
                    {headers: {Authorization: `token ${token}`}}
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
                        {headers: {Authorization: `token ${token}`}}
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

        const graphqlResponse = await $fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json'
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

        return {
            stats: {
                repos: uniqueRepos.length,
                stars: totalStars,
                contributions: calendar.totalContributions,
                languages: topLanguages,
                organizations: orgLogins
            },
            contributions
        }
    } catch (error: any) {
        console.error('GitHub API Error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch GitHub data: ' + (error.message || 'Unknown error')
        })
    }
})