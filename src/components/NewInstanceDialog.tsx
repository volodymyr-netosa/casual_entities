import * as React from 'react';

type Props = { entityTypes: {}, addNewInstance: (instance: {}) => any}
export class NewInstanceDialog extends React.Component<Props,null> {
    
    generatePropsInputs = (entityTypes: {[key: string]: string}) => {
        let inputs = []
        for (let prop of Object.keys(entityTypes)) {
            let type = entityTypes[prop];
            switch(type) {
                case "string": 
                    inputs.push((
                        <div className="form-group" key={prop}>
                            <label className="form-check-label" htmlFor={prop+'Text'}>{prop}</label>
                            <input type="text" className="form-control" id={prop+'Text'} placeholder={type} />
                        </div>
                    ))
                    break;
                case "number":
                    inputs.push((
                        <div className="form-group" key={prop}>
                            <label className="form-check-label" htmlFor={prop+'Number'}>{prop}</label>
                            <input type="number" className="form-control" id={prop+'Number'} placeholder={type} />
                        </div>
                    ))
                    break;
                case "boolean": 
                    inputs.push((
                        <div className="form-check" key={prop}>
                            <input type="checkbox" className="form-check-input" id={prop+'Check'} />
                            <label className="form-check-label" htmlFor={prop+'Check'}>{prop}</label>
                        </div>
                    ))
                    break;
            }
        }
        return inputs;
    }
    
    handleInstanceCreation = () => {

    }

    render() {
        let inputs = this.props.entityTypes && this.generatePropsInputs(this.props.entityTypes);
        return (
            <form>
                {inputs}
                <button type="submit" className="btn btn-primary mt-2">Create instance</button>
            </form>
        )
    }
}