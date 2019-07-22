var heroes = [
    {
        id : 1000,
        name : "Rosie",
        race : "Human",
        src : 'img/rosie-sprite.png',
        define : [16, 24, 0, 0],
        crop : [14, 0, 2, 2]
    },
    {
        id : 1001,
        name : "Utarag",
        race : "Orc",
        src : 'img/orc-sprite.png',
        define : [16, 24, 0, 0],
        crop : [14, 0, 2, 2],
    }
];

var enemies = [
    {
        id : 8002,
        name : "Orc Fighter",
        race : "Orc",
        src : 'img/orc-sprite.png',
        define : [16, 24, 0, 0],
        crop : [14, 0, 2, 2],
    }
];

var objects = [
    {
        id : 5001,
        name : "Tree",
        src : 'img/object-sprite.png',
        define : [32, 32, 0, 0],
        crop : [18, 1, 8, 8]
    }
]

var stage1 = [
    {
        id : 1000,
        name : "Rosie",
        level : 1,
        drop : [
            [8, 10]
        ]
    },
    {
        id : 1001,
        name : "Utarag",
        level : rollDice( 1, 4, 0 ),
        drop : [
            [ 19, 14 ]
        ]
    },
    {
        id : 5001,
        name : "Tree",
        drop : [
            [ 5, 13 ],
            [ 9, 15 ],
            [ 10, 16 ],
            [ 9, 17 ],
            [ 11, 13 ],
            [ 11, 18 ],
            [ 12, 19 ],
            [ 9, 20 ],
            [ 8, 19 ],
            [ 4, 14 ],
            [ 6, 14 ],
            [ 14, 14 ],
            [ 19, 13 ],
        ]
    },
    {
        id : 8002,
        name : "Orc Fighter",
        level : rollDice( 1, 4, 0 ),
        drop : [
            [ 5, 16 ],
            [ 15, 11 ],
            [ 17, 11 ]
        ]
    }
];

var stage_home = {
    "backgrounds" : [
        {
            "name" : "sky",
            "layer" : "wall",
            "define" : [ 0, 4 ],
            "tile" : [
                [ 0, 0, 30, 7 ]
            ]
        },
        {
            "name" : "ground",
            "layer" : "bottom",
            "define" : [ 0, 0 ],
            "tile" : [
                [ 0, 8 ,30, 12 ]
            ]
        },
        {
            "name" : "flowers",
            "layer" : "bottom",
            "define" : [ 2, 0 ],
            "tile" : [
                [ 8, 10, 1, 1 ],
                [ 9, 11, 1, 2 ],
                [ 14, 16, 1, 2 ],
                [ 18, 11, 2, 1 ],
            ]
        },
        {
            "name" : "horison",
            "layer" : "wall",
            "define" : [ 1, 4 ],
            "tile" : [
                [ 0, 7, 30, 1 ],
            ]
        },
        {
            "name" : "sunset",
            "layer" : "wall",
            "define" : [ 2, 4 ],
            "tile" : [
                [ 11, 7, 1, 1 ]
            ]
        },
        {
            "name" : "dirtRoad",
            "layer" : "bottom",
            "define" : [ 1, 0 ],
            "tile" : [
                [ 7, 10, 1, 3 ],
                [ 16, 11, 1, 4 ],
                [ 16, 16, 1, 1 ],
                [ 15, 17, 2, 1 ],
                [ 17, 18, 1, 2 ],
            ]
        },
        {
            "name" : "water",
            "layer" : "wall",
            "define" : [ 1, 2 ],
            "tile" : [
                [ 5, 11, 1, 1 ]
            ]
        },
        {
            "name" : "water0",
            "layer" : "wall",
            "define" : [ 1, 1 ],
            "tile" : [
                [ 5, 10, 1, 1 ]
            ]
        },
        {
            "name" : "water1",
            "layer" : "wall",
            "define" : [ 2, 1 ],
            "tile" : [
                [ 6, 10, 1, 1 ]
            ]
        },
        {
            "name" : "water3",
            "layer" : "wall",
            "define" : [ 2, 2 ],
            "tile" : [
                [ 6, 11, 1, 1 ]
            ]
        },
        {
            "name" : "water5",
            "layer" : "wall",
            "define" : [ 2, 3 ],
            "tile" : [
                [ 6, 12, 1, 1 ]
            ]
        },
        {
            "name" : "water6",
            "layer" : "wall",
            "define" : [ 1, 3 ],
            "tile" : [
                [ 5, 12, 1, 1 ]
            ]
        },
        {
            "name" : "water7",
            "layer" : "wall",
            "define" : [ 0, 3 ],
            "tile" : [
                [ 4, 12, 1, 1 ]
            ]
        },
        {
            "name" : "water9",
            "layer" : "wall",
            "define" : [ 0, 2 ],
            "tile" : [
                [ 4, 11, 1, 1 ]
            ]
        },
        {
            "name" : "water11",
            "layer" : "wall",
            "define" : [ 0, 1 ],
            "tile" : [
                [ 4, 10, 1, 1 ]
            ]
        },
        {
            "name" : "hut_wall",
            "layer" : "wall",
            "define" : [ 6, 1 ],
            "tile" : [
                [ 8, 9, 1, 1 ],
                [ 15, 10, 1, 1 ],
                [ 18, 10, 2, 1 ],
                [ 21, 12, 2, 1 ],
            ]
        },
        {
            "name" : "hut_leftend",
            "layer" : "wall",
            "define" : [ 3, 1 ],
            "tile" : [
                [ 5, 9, 1, 1 ],
                [ 10, 12, 1, 1 ],
                [ 13, 10, 1, 1 ],
                [ 20, 12, 1, 1 ]
            ]
        },
        {
            "name" : "hut_rightend",
            "layer" : "wall",
            "define" : [ 7, 1 ],
            "tile" : [
                [ 9, 9, 1, 1 ],
                [ 11, 12, 1, 1 ],
                [ 22, 12, 1, 1 ],
            ]
        },
        {
            "name" : "hut_door",
            "layer" : "wall",
            "define" : [ 5, 1 ],
            "tile" : [
                [ 7, 9, 1, 1 ],
                [ 16, 10, 1, 1 ]
            ]
        },
        {
            "name" : "hut_window",
            "layer" : "wall",
            "define" : [ 4, 1 ],
            "tile" : [
                [ 6, 9, 1, 1 ],
                [ 14, 10, 1, 1 ],
                [ 17, 10, 1, 1 ],
            ]
        },
        {
            "name" : "hut_roof",
            "layer" : "wall",
            "define" : [ 3, 0 ],
            "tile" : [
                [ 10, 11, 2, 1 ]
            ]
        },
        {
            "name" : "hut_roof_bottom",
            "layer" : "wall",
            "define" : [ 4, 0 ],
            "tile" : [
                [ 5, 8, 5, 1 ],
                [ 20, 11, 3, 1 ],
            ]
        },
        {
            "name" : "hut_roof_top",
            "layer" : "wall",
            "define" : [ 5, 0 ],
            "tile" : [
                [ 5, 7, 5, 1 ],
                [ 13, 7, 10, 1 ],
            ]
        },
        {
            "name" : "hut_roof_middle",
            "layer" : "wall",
            "define" : [ 7, 0 ],
            "tile" : [
                [ 13, 8, 10, 2 ],
                [ 20, 10, 3, 1 ],
            ]
        },
        {
            "name" : "hut_roof_over_half",
            "layer" : "over",
            "define" : [ 6, 0 ],
            "tile" : [
                [ 5, 6, 5, 1 ],
                [ 10, 10, 2, 1 ],
            ]
        },
        {
            "name" : "hut_roof_over",
            "layer" : "over",
            "define" : [ 8, 0 ],
            "tile" : [
                [ 13, 6, 10, 1 ],
            ]
        },
        {
            "name" : "woodsign1",
            "layer" : "wall",
            "define" : [ 3, 2 ],
            "tile" : [
                [ 9, 9, 1, 1 ]
            ]
        },
        {
            "name" : "woodsign2",
            "layer" : "ground",
            "define" : [ 3, 3 ],
            "tile" : [
                [ 9, 10, 1, 1 ]
            ]
        }
    ]
}