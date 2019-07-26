import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';
import { Container } from "../utility/container";
import { EntityList } from "./EntityList";
import { ItemsTable } from "./ItemTable"; 
import axios from 'axios';

const ENTITY_API_URL = '/api';

type Props = { entityPath: string };
type State = { container: Container, selectedEntityName: string}    //TODO: make this state React context?

export class App extends React.Component<Props,State> {
    constructor(props: any) {
        super(props);
        this.state = {
            container: null,
            selectedEntityName: ''
        }
    };
    componentDidMount() {
        axios.get(ENTITY_API_URL).then((response:any) => {
            this.setState({
                container: new Container(response.data)
            })
        })
    }

    selectEntityHandler = (name: string) => {
        this.setState({selectedEntityName: name});
    }
    
    addNewInstance = (instance: {}) => {
        this.state.container.addEntityInstance(
            this.state.selectedEntityName,
            instance
        )
    }

    render() {
        let entities = this.state && this.state.container && this.state.container.getEntitiesNames();
        let entityProps = this.state && this.state.container && this.state.container.getEntityProps(this.state.selectedEntityName);
        let instances = this.state && this.state.container && this.state.container.getEntityInstances(this.state.selectedEntityName);
        return (
                <div className='row fill no-gutters'>
                    <div className='col-md-4'>
                        <EntityList 
                            selectedEntityName={this.state.selectedEntityName} 
                            entities={entities} 
                            selectEntityHandler={this.selectEntityHandler}
                        />
                    </div>
                    <div className='col-md-8 pl-3'>
                        <ItemsTable 
                            entityProps={entityProps}
                            entityInstances={ instances } 
                            addNewInstance={this.addNewInstance}
                        />
                    </div>
                </div>
        );
    }
};