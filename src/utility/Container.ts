export class Container {
    private entities = new Map();
    private entitiesInstances = new Map();
    private allowedDataTypes = ['string', 'number', 'boolean']
    
    addEntity(name: string, properties: any) {
        if (this.entities.has(name) || !this.verifyEntityProperties(properties)) return false;
        this.entities.set(name, properties);
    }

    getEntityInstance(name: string) {
        return this.entitiesInstances.get(name);
    }

    verifyEntityProperties(properties: any) {
        for (let propName of Object.keys(properties)) {
            let propType = properties[propName];
            if (!(propType in this.allowedDataTypes)) return false;
        }
        return true;
    }

    verityEntityInstance(name: string, entityInstace: any) {
        let entity = this.entities.get(name);
        if (!entity) return false;
        for (let propName of Object.keys(entity)) {
            if (!(typeof entityInstace[propName] === entity[propName])) return false;
        }
        return true;
    }

    // for local testing
    deleteEntity(name: string) {
        return this.entities.delete(name);
    }
}