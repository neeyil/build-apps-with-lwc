import { LightningElement } from 'lwc';

export default class HelloWebComponent extends LightningElement {
    // Data Binding
    greeting = 'Trailblazer'; // properties are reactive

    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }

    // Use Expressions (getter functions - not reactive but reevaluated each time the components rerenders. either their value changed or not)

    currentDate = new Date().toDateString();

    // get currentDate() {
    //     return new Date().toDateString();
    // }

    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }
}