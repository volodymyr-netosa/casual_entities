import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';

import axios from 'axios';
const ENTITY_API_URL = '/instances';

import { EntityList } from "./EntityList";
import { ItemsTable } from "./ItemTable"; 

type Props = { entityPath: string };
type State = { selectedEntityName: string, entityProps:{[key:string] : string}, entityInstances: {}[]};    //TODO: make this state React context?

export class App extends React.Component<Props,State> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedEntityName: '',
            entityProps: null,
            entityInstances: []
        }
    };

    selectEntityHandler = (name: string) => {
        this.setState({selectedEntityName: name});
        this.fetchData(name);
    }

    addInstanceHandler = (instance: {}) => {
        console.log('asd');
        this.setState((state) => {
            const prevInstances = state.entityInstances || [];
            return { entityInstances: [...prevInstances, instance]}
        })
    }

    fetchData(entityName: string) {
        axios.get(ENTITY_API_URL, { params: { name: entityName }}).then((response) =>
        {
            console.log('setting');
            this.setState({
                entityProps: response.data.entityProps,
                entityInstances: response.data.entityInstances
            })
        })
    }

    render() {
        return (
                <div className='row fill no-gutters'>
                    <div className='col-md-4'>
                        <EntityList 
                            selectedEntityName={this.state.selectedEntityName} 
                            selectEntityHandler={this.selectEntityHandler}
                        />
                    </div>
                    <div className='col-md-8 pl-3'>
                        <ItemsTable
                            entityProps={this.state.entityProps}
                            entityInstances={this.state.entityInstances}
                            selectedEntityName={this.state.selectedEntityName}
                            addInstanceHandler={this.addInstanceHandler}
                        />
                    </div>
                </div>
        );
    }
};