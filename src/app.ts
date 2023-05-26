import { Base } from "@/base";
import { Config, AppInterface } from "@/types";
import { ValidateDirection } from "@/decorators";

class App extends Base implements AppInterface {
    constructor( scope: HTMLElement, config: Config ) {
        super( scope, config );
        this.changeExistingMarkup();
        this.vertical();
        this.horizontal();
        this.animate();
    }

    @ValidateDirection
    vertical() {
        if( !this.mover || !this.wrapper || !this.item) return;

        const scopeHeight = this.scope.clientHeight
        const gap = Math.ceil( scopeHeight / this.mover.clientHeight );
        
        this.duplicate = ( gap > 1 ) ? gap * 2 :  3;    
        this.wrapper.style.maxHeight = scopeHeight +  'px';
        this.wrapper.style.overflow = 'hidden';

        for ( let i = 1; i < this.duplicate; i++ ) {
            this.mover.appendChild( this.item.cloneNode(true) )
        }

        this.size = this.mover.clientHeight;
        this.visibleArea = this.scope.clientHeight;
        this.translate = new Function(
            'value',
            'return `translateY(${value}px)`'
        );
    }

    @ValidateDirection
    horizontal() {
        if( !this.mover || !this.wrapper || !this.item) return;

        this.mover.style.display = 'inline-flex';
        this.mover.style.alignItems = 'center';

        const scopeWidth = this.scope.clientWidth
        const gap = Math.ceil( scopeWidth / this.mover.clientWidth );
        

        this.duplicate = ( gap > 1 ) ? gap * 2 :  3;    
        this.wrapper.style.maxWidth = scopeWidth +  'px';
        this.wrapper.style.overflow = 'hidden';

        for ( let i = 1; i < this.duplicate; i++ ) {
            this.mover.appendChild( this.item.cloneNode(true) )
        }

        this.size = this.mover.clientWidth;
        this.visibleArea = this.scope.clientWidth;
        this.translate = new Function(
            'value',
            'return `translateX(${value}px)`'
        );
    }
        
    moveElement( delta : number ) {
        if( !this.config || !this.scope || !this.mover) return;

        let string = '0';
        let point = delta * ( this.size - this.visibleArea );

        switch ( this.config.direction ) {
            case 'up':
                string = `-${ point }`;
                break;
            case 'left':
                string = `-${ point }`;
                break;
            case 'down':
                string = `-${ this.size - this.visibleArea - point }`;
                break;
            case 'right':
                string = `-${ this.size - this.visibleArea - point }`;
                break;
        }

        this.mover.style.transform = this.translate( string  );
    };
        
    animate() {
        const now = performance.now();
        const delta = Math.min( ( now - this.start ) / this.speed, 1 );

        this.moveElement( delta );

        if ( delta >= 1 ) {
            this.start = performance.now();
        }

        requestAnimationFrame( this.animate.bind(this) );
    }
}

class Marquee {
    constructor( public selector: string, config?: Config ){
        
        const defaultConfig = {
            direction: 'up',
            duration: 30,
        } satisfies Config

        if( typeof selector === 'string' ) {
            const scopes = document.querySelectorAll( selector )!
            scopes.forEach( (scope) => {
                new App( 
                    scope as HTMLElement, 
                    Object.assign( defaultConfig, config  ) 
                )
            } )
        }
    }
}

window.Marquee = Marquee;
export default Marquee;

new window.Marquee( '.marquee-up', { direction: 'up', duration: 30 })
new window.Marquee( '.marquee-down', { direction: 'down', duration: 30 })
new window.Marquee( '.marquee-right', { direction: 'right', duration: 30 })
new window.Marquee( '.marquee-left', { direction: 'left', duration: 30 })
