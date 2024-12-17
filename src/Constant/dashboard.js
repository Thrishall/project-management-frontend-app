export const boardDayFilterOptions = [
    {
        id: 1,
        title: 'Today',
        slug: 'today',
        classses: '',
    },
    {
        id: 2,
        title: 'This Week',
        slug: 'week',
        classses: '',
    },
    {
        id: 3,
        title: 'This Month',
        slug: 'month',
        classses: '',
    },
];

export const taskActionList = (hideAction) => [
    {
        id: 1,
        title: 'Edit',
        slug: '',
        classses: '',
        hidden: hideAction
    },
    {
        id: 2,
        title: 'Share',
        slug: '',
        classses: '',
    },
    {
        id: 3,
        title: 'Delete',
        slug: '',
        classses: '',
        hidden: hideAction
    },
].filter((item) => !item?.hidden);

export const visibleProgressType = (type) => {
    return [
        {
            title: "PROGRESS",
            id: 1,
            hidden: type === "progress",
        },
        {
            title: "DONE",
            id: 2,
            hidden: type === "done"
        },
        {
            title: "BACKLOG",
            id: 3,
            hidden: type === "backlog"
        },
        {
            title: "TO-DO",
            id: 4,
            hidden: type === "todo"
        },
    ].filter( (item) => !item.hidden );
}

export const dotColor = {
    "LOW PRIORITY" : "#63C05B",
    "MODERATE PRIORITY" : "#18B0FF",
    "HIGH PRIORITY" : "#FF2473"
}