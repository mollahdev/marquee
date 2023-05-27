import { Config } from './types';
export declare class Base<T extends HTMLElement> {
    scope: T;
    config: Config;
    start: number;
    size: number;
    visibleArea: number;
    duplicate: number;
    translate: Function;
    mover?: HTMLElement;
    wrapper?: HTMLElement;
    item?: HTMLElement;
    className?: string;
    constructor(scope: T, config: Config);
    get speed(): number;
    private wrapInner;
    protected changeExistingMarkup(): void;
}
