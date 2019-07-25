export class Container {
    private entities = new Map();
    private entitiesInstances = new Map();
    private allowedDataTypes = ['string', 'number', 'boolean']

    constructor(entities: {name:string, props: {}}[]) {
        entities.forEach((value) => {
            const { name, props } = value;
            this.addEntity(name, props);
        });
    }
    
    addEntity(name: string, properties: any) {
        if (this.entities.has(name) || !this.verifyEntityProperties(properties)) {
            console.log(`Adding ${name} entity failed. Not allowed data type or entity with that name already exists.`)   //TODO: add normal logger?
            return false;
        }
        this.entities.set(name, properties);
    }

    getEntityInstances(name: string) {
        return this.entitiesInstances.get(name);
    }

    addEntityInstance(entityName: string, instance: {}) {
        if (!this.verityEntityInstance(entityName, instance)) {
            console.log(`Cant add ${entityName} instance ${instance}, props type mismatching`); //TODO: logger ?Xd
            return false;
        }
        if (this.entitiesInstances.has(entityName)) {
            this.entitiesInstances.get(entityName).push(instance);
        }
        else this.entitiesInstances.set(entityName,[instance]);
    }

    getEntitiesNames(){
        let x = Array.from(this.entities.keys());
        return x; 
    }

    verifyEntityProperties(properties: any) {
        for (let propName of Object.keys(properties)) {
            let propType = properties[propName];
            if (!~(this.allowedDataTypes.indexOf(propType))) return false;
        }
        return true;
    }

    verityEntityInstance(entityName: string, entityInstace: any) {
        let entity = this.entities.get(entityName);
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