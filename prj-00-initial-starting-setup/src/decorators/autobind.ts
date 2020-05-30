
// Autobind Decorator to bind this keyword to the object the method belongs to
export function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    // get the original method from the value of the descriptor
    const originalMethod = descriptor.value;
    // create an adjusted descriptor w/ new descriptor properties
    const adjustedDesc: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // boundFn will bind this inside the original method and also the same object
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDesc;
}
