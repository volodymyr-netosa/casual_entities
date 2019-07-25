import { getEntitiesFromFolder } from './utility';

export class Container {
    private entities = new Map();
    private entitiesInstances = new Map();
    private allowedDataTypes = ['string', 'number', 'boolean']

    async init(entityFolderPath: string) {
        return getEntitiesFromFolder(entityFolderPath).then(
            (entities) => {
                entities.forEach((name, props) => {
                    if (this.verifyEntityProperties(props))
                        this.entities.set(name, props)
                    else console.log(`Adding ${name} entity failed. Not allowed data type`)   //TODO: add normal logger?
                });
            }
        )
    }
    
    addEntity(name: string, properties: any) {
        if (this.entities.has(name) || !this.verifyEntityProperties(properties)) return false;
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
        return Array.from(this.entitiesInstances.keys())
    }

    verifyEntityProperties(properties: any) {
        for (let propName of Object.keys(properties)) {
            let propType = properties[propName];
            if (!(propType in this.allowedDataTypes)) return false;
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