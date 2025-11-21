import type { Collection } from 'tinacms';

const Resources: Collection = {
    label: 'Resources',
    name: 'resources',
    path: 'content/resources',
    format: 'md',
    fields: [
        {
            type: 'string',
            label: 'Title',
            name: 'title',
            isTitle: true,
            required: true,
        },
        {
            type: 'string',
            label: 'Description',
            name: 'description',
            ui: {
                component: 'textarea',
            },
        },
        {
            type: 'string',
            label: 'Category',
            name: 'category',
            options: [
                { label: 'Community Profile', value: 'community_profile' },
                { label: 'Strategic Plan', value: 'strategic_plan' },
                { label: 'Meeting Notes', value: 'meeting_notes' },
                { label: 'Labor Market Study', value: 'labor_market_study' },
                { label: 'Infrastructure Map', value: 'infrastructure_map' },
                { label: 'Other', value: 'other' },
            ],
        },
        {
            type: 'image',
            label: 'File (PDF)',
            name: 'file',
        },
        {
            type: 'datetime',
            label: 'Date Added',
            name: 'date',
        },
    ],
};

export default Resources;
