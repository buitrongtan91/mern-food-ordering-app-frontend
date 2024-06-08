export type OrderStatusInfo = {
    label: string;
    value: string;
    progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
    {
        label: "Placed",
        value: "placed",
        progressValue: 0,
    },
    {
        label: "Awaiting restaurant confirmation",
        value: "paid",
        progressValue: 25,
    },
    {
        label: "In progress",
        value: "pending",
        progressValue: 50,
    },
    {
        label: "Out for delivery",
        value: "completed",
        progressValue: 75,
    },
    {
        label: "Delivered",
        value: "delivered",
        progressValue: 100,
    },
];
