import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "../utility/container";
import { EntityList } from "./EntityList";
import { ItemsTable } from "./ItemTable"; 

interface AppContextInterface {
    container: Container,
    selectedEntityName: string
}
const AppContext: AppContextInterface = {
    container: new Container(),
    selectedEntityName: ''
} 

const ctxt = React.createContext<AppContextInterface | null>(null);

type Props = { entityPath: string };
type State = { container: Container, selectedEntityName: string} 

export class App extends React.Component<Props,State> {
    constructor(props:any) {
        super(props);
        this.state = {
            container: new Container,
            selectedEntityName: ''
        }
    }

    componentDidMount() {
        this.state.container.init(this.props.entityPath);
    }

    render() {
        let entities = this.state.container.getEntitiesNames();
        return (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <EntityList selectedEntityName={this.state.selectedEntityName} />
                        </div>
                        <div className='col-md-8'>
                            <ItemsTable selectedEntityName={this.state.selectedEntityName} />
                        </div>
                    </div>
                </div>
        );
    }
};