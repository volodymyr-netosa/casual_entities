import { render } from "react-dom";
import * as React from "react";

type Props = { 
    selectedEntityName: string, 
    entities: string[],
    selectEntityHandler: (name: string) => any
}
export class EntityList extends React.Component<Props,null> {
    constructor(props:any){
        super(props); 
    }

    render() {
        let entitiesList = this.props.entities.map((name)=> {
            <a href="#" 
            className="list-group-item list-group-item-action bg-light" 
            onClick={this.props.selectEntityHandler(name)}>
                {name}
            </a>
        });
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Entities list</div>
                <div className="list-group list-group-flush">
                    {entitiesList}
                </div>
            </div>
        )
    }
}