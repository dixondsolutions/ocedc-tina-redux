import type { Collection } from 'tinacms';

const Communities: Collection = {
    label: 'Communities',
    name: 'communities',
    path: 'content/communities',
    format: 'md',
    fields: [
        {
            type: 'string',
            label: 'Community Name',
            name: 'name',
            isTitle: true,
            required: true,
        },
        {
            type: 'string',
            label: 'Population',
            name: 'population',
        },
        {
            type: 'rich-text',
            label: 'Demographics',
            name: 'demographics',
        },
        {
            type: 'rich-text',
            label: 'Description',
            name: 'description',
        },
        {
            type: 'string',
            label: 'Key Employers',
            name: 'keyEmployers',
            list: true,
        },
        {
            type: 'rich-text',
            label: 'Contact Information',
            name: 'contactInfo',
        },
        {
            type: 'image',
            label: 'Community Profile PDF',
            name: 'profilePdf',
        },
        {
            type: 'image',
            label: 'Photo Gallery',
            name: 'gallery',
            list: true,
        },
    ],
};

export default Communities;
