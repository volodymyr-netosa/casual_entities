
const { getEntitiesFromFolder } = require('./utility');
class Container {
    constructor() {
        this.entities = new Map();
        this.entitiesInstances = new Map();
        this.allowedDataTypes = ['string', 'number', 'boolean']
    }

    init(entities){
        entities.forEach((value) => {
            const { name, props } = value;
            this.addEntity(name, props);
        });
    }
    
    addEntity(name, properties) {
        if (this.entities.has(name) || !this.verifyEntityProperties(properties)) {
            const error = `Adding ${name} entity failed. Not allowed data type or entity with that name already exists.`;
            console.log(error)   //TODO: add normal logger?
            return {
                error
            };
        }
        this.entities.set(name, properties);
        return {
            error: false
        };
    }

    getEntityInstances(name) {
        return this.entitiesInstances.get(name);
    }

    getEntityProps(name){
        return this.entities.get(name);
    }

    addEntityInstance(entityName, instance) {
        if (!this.verityEntityInstance(entityName, instance)) {
            const error = `Cant add ${entityName} instance ${JSON.stringify(instance)}, props type mismatching`;
            console.log(error); //TODO: logger ?Xd
            return { error };
        }
        if (this.entitiesInstances.has(entityName)) {
            this.entitiesInstances.get(entityName).push(instance);
        }
        else this.entitiesInstances.set(entityName,[instance]);
        return {
            error: false
        }
    }

    getEntitiesNames(){
        let x = Array.from(this.entities.keys());
        return x; 
    }

    verifyEntityProperties(properties) {
        for (let propName of Object.keys(properties)) {
            let propType = properties[propName];
            if (!~(this.allowedDataTypes.indexOf(propType))) return false;
        }
        return true;
    }

    verityEntityInstance(entityName, entityInstace) {
        let entity = this.entities.get(entityName);
        if (!entity) return false;
        for (let propName of Object.keys(entity)) {
            if (!(typeof entityInstace[propName] === entity[propName])) return false;
        }
        return true;
    }

    // for local testing
    deleteEntity(name) {
        return this.entities.delete(name);
    }
}
async function initializeContainer(container, entitiesPath) { 
    return getEntitiesFromFolder(entitiesPath).then(
        (entities) => {
            container.init(entities);
        },
        (err) => {
            console.log("Error intializing container", err);
        }
    )
}

module.exports = {
    initializeContainer,
    Container
}