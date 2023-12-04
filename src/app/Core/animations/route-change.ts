import { animate, group, query, style, transition, trigger, useAnimation } from "@angular/animations";
import { backInRight, backOutLeft, bounceInRight, bounceOutLeft } from 'ng-animate';

// export const bounceAnimation = trigger('bounce', [
//     transition('routeEnter => routeLeave', useAnimation(backInRight,
//         {
//             params: { timing: 10, delay: 0 }
//         })),
//     // transition('routeLeave => routeEnter', useAnimation(backOutLeft,
//     //     {
//     //         params: { timing: 10, delay: 0 }
//     //     }))
// ]);

// export const bounceAnimation = trigger('bounce', [
//     transition(':enter', [
//         style({ transform: 'translateX(-100%)', opacity: 0 }),
//         animate('5000ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
//     ]),
//     transition(':leave', [
//         animate('5000ms ease-in-out', style({ transform: 'translateX(100%)', opacity: 0 })),
//     ]),
// ]);

// export const backOutLeftAnimation = trigger('backOutLeft', [
//     transition(':leave', animate('.5s ease-out', style({ height: 0 }))),
// ]);

// export const backInRightAnimation = trigger('backInRight', [
//     transition(':enter', animate('.5s ease-out', style({ height: 100 }))),
// ]);

// export const bounceAnimation = trigger('bounce', [
//     transition("* <=> *", [
//         query(":enter, :leave",
//             style({ position: 'absolute', width: '98%' }),
//             { optional: true }),

//         group([

//             query(":enter", [
//                 style({ transform: "scale(0) translateX(100%)" }),
//                 animate("1s", style({ transform: "scale(1) translateX(0%)" }))
//             ], { optional: true }),

//             query(":leave", [
//                 style({ transform: "scale(1) translateX(0%)" }),
//                 animate("1s", style({ transform: "scale(0) translateX(-100%)" }))
//             ], { optional: true })

//         ])
//     ])
// ]);

export const bounceAnimation = trigger('bounce', [
    transition("* <=> *", [
        query(":enter, :leave",
            style({ position: 'absolute', width: '98%' }),
            { optional: true }),

        group([

            query(":enter", [
                style({ opacity: 0 }),
                animate("0.5s", style({ offset: 10, opacity: '1' }))
            ], { optional: true }),

            query(":leave", [
                style({ opacity: 1 }),
                animate("0.5s", style({ offset: 10, opacity: '0' }))
            ], { optional: true })

        ])
    ])
]);