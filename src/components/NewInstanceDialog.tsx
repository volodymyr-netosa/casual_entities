import * as React from 'react';
import axios from 'axios';
const ENTITY_API_URL = '/add';

type Props = { 
    entityTypes: {}, 
    entityName: string,
    addInstanceHandler: (entity: {}) => any
}

export class NewInstanceDialog extends React.Component<Props,any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    handleInputChange = (event:any) => {
        const target = event.target;
        let value: any;
        switch (target.type) {
            case "text":
                value = target.value;
                break;
            case "number":
                value = parseInt(target.value);
                break;
            case "checkbox":
                console.log(target);
                value = target.checked
        }
        const name = target.name;

        this.setState((state: any, props: Props) => {
            const instance=Object.assign({}, state[props.entityName], {[name]: value})
            return {[props.entityName]: instance}
        })
    }

    generateStringInput(propName: string, handleInputChange: any) {
        return (
            <div className="form-group" key={propName}>
                <label className="form-check-label" htmlFor={propName+'Text'}> {propName} </label>
                <input
                    name={propName}
                    type="text" 
                    className="form-control" 
                    id={propName+'Text'} 
                    placeholder='string'
                    onChange={handleInputChange}
                />
            </div>
        )
    }

    generateNumberInput(propName:string, handleInputChange: any) {
        return (
            <div className="form-group" key={propName}>
                <label className="form-check-label" htmlFor={propName+'Number'}>{propName}</label>
                <input
                    name={propName}
                    type="number" 
                    className="form-control" 
                    id={propName+'Number'} 
                    placeholder='number' 
                    onChange={handleInputChange}
                />
            </div>          
        )
    }

    generateBooleanInput(propName:string, handleInputChange: any) {
        return (
            <div className="form-check" key={propName}>
                <input 
                    name={propName}
                    type="checkbox" 
                    className="form-check-input" 
                    id={propName+'Check'} 
                    onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor={propName+'Check'}>{propName}</label>
            </div>
        )
    }
    generatePropsInputs = (entityTypes: {[key: string]: string}) => {
        let inputs = []
        for (let propName of Object.keys(entityTypes)) {
            let type = entityTypes[propName];
            switch(type) {
                case "string": 
                    inputs.push(this.generateStringInput(propName, this.handleInputChange))
                    break;
                case "number":
                    inputs.push(this.generateNumberInput(propName, this.handleInputChange))
                    break;
                case "boolean": 
                    inputs.push(this.generateBooleanInput(propName, this.handleInputChange))
                    break;
            }
        }
        return inputs;
    }

    handleFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const instance = this.state[this.props.entityName];
        axios.post(ENTITY_API_URL, {
            instance,
            name: this.props.entityName
        })
        this.props.addInstanceHandler(instance);  //it isn't ok to send full this.state
    }

    render() {
        let inputs = this.props.entityTypes && this.generatePropsInputs(this.props.entityTypes);
        return (
            <form onSubmit={this.handleFormSubmit}>
                {inputs}
                <button type="submit" className="btn btn-primary mt-2">Create instance</button>
            </form>
        )
    }
}