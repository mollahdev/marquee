import { Config } from "@/types";

export function ValidateDirection( 
        _target: any, 
        propertyKey: 'vertical' | 'horizontal', 
        descriptor: PropertyDescriptor & { config?: Config } 
    ) {
    
        const method = descriptor.value;
        const option = {
            vertical: ['up', 'down'],
            horizontal: ['left', 'right']
    }

    descriptor.value = function() {
        if(  option[propertyKey] && this.config ) {
            const opt = option[propertyKey];
            const { direction } = this.config;
            
            if( opt.includes( direction ) ) {
                method.apply( this )
            }
        }
    }
}