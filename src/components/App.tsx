import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "../utility/container";
import { EntityList } from "./EntityList";
import { ItemsTable } from "./ItemTable"; 
import axios from 'axios';

const ENTITY_API_URL = '/api';

type Props = { entityPath: string };
type State = { container: Container, selectedEntityName: string} 

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
    
    render() {
        let entities = this.state && this.state.container && this.state.container.getEntitiesNames();
        return (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <EntityList 
                                selectedEntityName={this.state.selectedEntityName} 
                                entities={entities} 
                                selectEntityHandler={this.selectEntityHandler}
                            />
                        </div>
                        <div className='col-md-8'>
                            <ItemsTable selectedEntityName={this.state.selectedEntityName} />
                        </div>
                    </div>
                </div>
        );
    }
};