export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = config.githubToken
    const username = config.public.githubUsername

    // Test basic auth with GitHub
    let testResult = 'Unknown'
    let rateLimitInfo = null

    try {
        const response: any = await $fetch('https://api.github.com/rate_limit', {
            headers: {
                Authorization: `token ${token}`,
                'User-Agent': 'Samouly'
            }
        })
        testResult = 'Token is valid'
        rateLimitInfo = response.rate
    } catch (error: any) {
        testResult = `Token test failed: ${error?.message || 'Unknown error'}`
    }

    return {
        hasToken: !!token,
        tokenPrefix: token ? `${token.substring(0, 4)}...${token.substring(token.length - 4)}` : 'NO TOKEN',
        tokenLength: token?.length || 0,
        username,
        testResult,
        rateLimitInfo
    }
})
