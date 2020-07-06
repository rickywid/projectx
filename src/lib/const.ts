interface technologies {
    [name: string]: {
        slug: string;
        name: string;
    }
}

// technologies mapping must be exactly the same as technologies table
export let technologies: technologies = {
    1: {
        slug: 'jquery',
        name: 'JQuery'
    },
    2: {
        slug: 'react',
        name: 'React'
    },
    3: {
        slug: 'angular',
        name: 'Angular'
    },
    4: {
        slug: 'asp-net',
        name: 'ASP.NET'
    },
    5: {
        slug: 'node',
        name: 'Node'
    },
    6: {
        slug: 'spring',
        name: 'Spring'
    },
    7: {
        slug: 'vue',
        name: 'Vue'
    },
    8: {
        slug: 'django',
        name: 'Django'
    },
    9: {
        slug: 'flask',
        name: 'Flask'
    },
    10: {
        slug: 'laravel',
        name: 'Laravel'
    },
    11: {
        slug: 'rubyonrails',
        name: 'Ruby on Rails'
    },
    12: {
        slug: 'drupal',
        name: 'Drupal'
    },
    13: {
        slug: 'javascript',
        name: 'JavaScript'
    },
    14: {
        slug: 'html',
        name: 'HTML'
    },
    15: {
        slug: 'css',
        name: 'CSS'
    },
    16: {
        slug: 'typescript',
        name: 'TypeScript'
    },
    17: {
        slug: 'electron',
        name: 'Electron'
    },
    18: {
        slug: 'graphql',
        name: 'GraphQL'
    },
    19: {
        slug: 'symfony',
        name: 'Symfony'
    },
    20: {
        slug: 'mysql',
        name: 'MySQL'
    },
    21: {
        slug: 'rethink',
        name: 'RethinkDB'
    },
    22: {
        slug: 'mongo',
        name: 'MongoDB'
    },
    23: {
        slug: 'postgresql',
        name: 'Postgreql'
    },
    24: {
        slug: 'firebase',
        name: 'Firebase'
    },
    25: {
        slug: 'aws',
        name: 'AWS'
    },
    26: {
        slug: 'azure',
        name: 'Azure'
    },
    27: {
        slug: 'circleci',
        name: 'CircleCI'
    },
    28: {
        slug: 'docker',
        name: 'Docker'
    },
    29: {
        slug: 'travisci',
        name: 'TravisCI'
    },
    30: {
        slug: 'gitlab',
        name: 'GitLab'
    },
    31: {
        slug: 'googlecloud',
        name: 'Google Cloud'
    },    
    32: {
        slug: 'jenkins',
        name: 'Jenkins'
    },
    33: {
        slug: 'heroku',
        name: 'Heroku'
    },
    34: {
        slug: 'nextjs',
        name: 'NextJS'
    },
    35: {
        slug: 'nuxtjs',
        name: 'NuxtJS'
    },
    36: {
        slug: 'gatsbyjs',
        name: 'GatsbyJS'
    }
}

// tags mapping must be exactly the same as tags table
export let tags: {[name: string]: string} = {
    1: 'Music',
    2: 'Sports',
    3: 'Productivity',
    4: 'Analytics',
    5: 'FinTech',
    6: 'Personal'
}

export const siteName = 'Hacker Valley';
export const pageTitle = `${siteName} - Discover new and exciting creative side projects`