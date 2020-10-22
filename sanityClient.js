import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: '5pbbu4rs',
    dataset: 'production',
    useCdn: false,
});