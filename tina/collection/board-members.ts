import type { Collection } from 'tinacms';

const BoardMembers: Collection = {
    label: 'Board Members',
    name: 'boardMembers',
    path: 'content/board-members',
    format: 'md',
    fields: [
        {
            type: 'string',
            label: 'Name',
            name: 'name',
            isTitle: true,
            required: true,
        },
        {
            type: 'string',
            label: 'Title',
            name: 'title',
        },
        {
            type: 'string',
            label: 'Organization',
            name: 'organization',
        },
        {
            type: 'string',
            label: 'Sector',
            name: 'sector',
            options: [
                { label: 'Public', value: 'public' },
                { label: 'Private', value: 'private' },
            ],
        },
        {
            type: 'image',
            label: 'Photo',
            name: 'photo',
        },
        {
            type: 'rich-text',
            label: 'Bio',
            name: 'bio',
        },
        {
            type: 'string',
            label: 'Term Dates',
            name: 'term',
        },
        {
            type: 'string',
            label: 'Committees',
            name: 'committees',
            list: true,
        },
    ],
};

export default BoardMembers;
