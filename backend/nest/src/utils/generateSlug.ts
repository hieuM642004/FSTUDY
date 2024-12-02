import slugify from 'slugify';

export function generateSlug(title: string): string {
    return slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
    });
}
