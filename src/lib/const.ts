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

