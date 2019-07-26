import * as React from "react";
import axios from 'axios';
const ENTITY_API_URL = '/names';

type Props = { 
    selectedEntityName: string, 
    selectEntityHandler: (name: string) => any
}
type State = {
    entities: string[]
}
export class EntityList extends React.Component<Props,State> {
    constructor(props:any){
        super(props);
        this.state = {
            entities: []
        }
    }
    componentDidMount(){
        axios.get(ENTITY_API_URL).then((response) =>
        { 
            this.setState({
                entities: response.data
            })
        })
    }

    render() {
        let entitiesList = this.state.entities.map((name, id)=>
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