export type Direction = 'up' | 'down' | 'left' | 'right';
export type Duration = number

export interface Config {
    direction: Direction
    duration: Duration
}

export interface AppInterface {
    vertical(): void;
    horizontal(): void;
    animate(): void;
}

export type TagAttributes = {
    [key?]: string;
}