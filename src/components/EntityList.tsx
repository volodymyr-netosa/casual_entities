import { render } from "react-dom";
import * as React from "react";

type Props = { 
    selectedEntityName: string, 
    entities: string[],
    selectEntityHandler: (name: string) => any
}
export class EntityList extends React.Component<Props,null> {
    render() {
        let entitiesList = this.props.entities && this.props.entities.map((name, id)=>
            <a href="#" 
                className="list-group-item list-group-item-action bg-light" 
                key={id}
                onClick={() => this.props.selectEntityHandler(name)}
            >
                {name}
            </a>
        );
        return (
            <div className="bg-light border-right fill" id="sidebar-wrapper">
                <div className="sidebar-heading p-md-3 text-center">Entities list</div>
                <div className="list-group list-group-flush">
                    {entitiesList}
                </div>
            </div>
        )
    }
}