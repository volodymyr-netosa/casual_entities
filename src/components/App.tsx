import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';

import { EntityList } from "./EntityList";
import { ItemsTable } from "./ItemTable"; 

type Props = { entityPath: string };
type State = { selectedEntityName: string}    //TODO: make this state React context?

export class App extends React.Component<Props,State> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedEntityName: ''
        }
    };


    selectEntityHandler = (name: string) => {
        this.setState({selectedEntityName: name});
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
                            selectedEntityName={this.state.selectedEntityName}
                        />
                    </div>
                </div>
        );
    }
};