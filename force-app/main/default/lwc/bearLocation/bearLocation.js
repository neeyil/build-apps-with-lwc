// Import necessary modules from Lightning Web Components
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Set Bear object fields
const NAME_FIELD = 'Bear__c.Name'; // Field API name for Bear's Name
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s'; // Field API name for Bear's Latitude
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s'; // Field API name for Bear's Longitude

// Array containing the fields to be retrieved for the Bear record
const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD,
    LOCATION_LONGITUDE_FIELD
];

// Lightning Web Component class definition
export default class BearLocation extends LightningElement {
    @api recordId; // Property to store the recordId passed to the component
    name; // Property to store Bear's name
    mapMarkers = []; // Property to store map markers for displaying Bear's location

    // Wire method to retrieve Bear record data using getRecord
    @wire(getRecord, { recordId: '$recordId', fields: bearFields })
    loadBear({ error, data }) {
        if (error) {
            // TODO: Handle error - Placeholder comment for handling errors
        } else if (data) {
            // Get Bear data
            this.name = getFieldValue(data, NAME_FIELD); // Retrieve Bear's name from the record data
            const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD); // Retrieve Bear's latitude from the record data
            const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD); // Retrieve Bear's longitude from the record data

            // Transform bear data into map markers
            this.mapMarkers = [{
                location: { Latitude, Longitude },
                title: this.name, // Display Bear's name as the title of the map marker
                description: `Coords: ${Latitude}, ${Longitude}` // Display coordinates as the description of the map marker
            }];
        }
    }

    // Getter method to dynamically determine the card title based on Bear's name
    get cardTitle() {
        return (this.name) ? `${this.name}'s location` : 'Bear location';
    }
}
