import { Config, TagAttributes } from "@/types"

export class Base<T extends HTMLElement> {
    start: number
    size: number
    visibleArea: number
    duplicate: number
    translate: Function
    mover?: HTMLElement
    wrapper?: HTMLElement
    item?: HTMLElement
    className?: string

    constructor( public scope: T, public config: Config ) {
        this.start = performance.now()
        this.size = 0;
        this.visibleArea = 0;
        this.duplicate = 4;
        this.translate = new Function( '_', 'return "translate(0, 0)"' )
    }

    get speed() {
        return this.config?.duration! * 1000
    }

    private wrapInner( 
        parent: T, 
        tagName: string, 
        attributes: TagAttributes 
    ): T
    {
        const wrapper = document.createElement(tagName);
        const element = parent.appendChild( wrapper );
        for( let key in attributes ) {
            element.setAttribute( key, attributes[(key as keyof TagAttributes)] )
        }
        while (parent.firstChild !== wrapper) {
            wrapper.appendChild(parent.firstChild!);
        }

        return element as T;
    }

    protected changeExistingMarkup() {
        this.className = `direction-${this.config.direction}`;
        this.item = this.wrapInner( this.scope, 'div', { class: `marquee-clone` } );
        this.mover = this.wrapInner( this.scope, 'div', { class: `marquee-mover ${this.className}` } )
        this.wrapper = this.wrapInner( this.scope, 'div', { class: `marquee-wrapper` } )
    }
}