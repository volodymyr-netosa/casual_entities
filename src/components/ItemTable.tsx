import { render } from "react-dom";
import * as React from "react";
import { Table } from "react-bootstrap";
import { NewInstanceDialog } from "./NewInstanceDialog";
import axios from 'axios';
const ENTITY_API_URL = '/api';

type Props = { selectedEntityName: string }
type State = {}
export class ItemsTable extends React.Component<Props,any> {
    componentDidMoun() {
        axios.get(ENTITY_API_URL).then((response) =>
            this.setState({
                entityProps: response.data.entityProps,
                entityInstances: response.data.entityInstances
            })
        )
    }
    generateTableRow = (columnNames: string[], instance: {[key: string]: string}) => {
        return columnNames.map(
            (colName, id) => 
                <td key={id}>
                    {instance[colName]}
                </td>
        )
    }

    generateColumnNames(entityProps: {}) {          //We need this func to create column names order in table
        return Object.keys(entityProps);
    }

    generateInstanceTable(entityProps: {}, entityInstances: {}[]) {
        let columnNames = this.generateColumnNames(entityProps);
        return (
            <Table striped bordered hover>
                <thead>
                    {this.generateTableHeader(columnNames)}
                </thead>
                <tbody>
                    {this.generateTableBody(columnNames, entityInstances)}
                </tbody>
            </Table>
        )
    }

    generateTableHeader(columnNames: string[]) {
        return (
            <tr>
                {columnNames.map(
                    (name, id) => (
                        <th key={id}>
                            {name}
                        </th>
                ))}
            </tr>
        )
    }
    generateTableBody(columnNames: string[], entityInstances: {}[] = []) {
        return entityInstances.map(
            (instance: {}, id) => 
                <tr key={id}>
                    {this.generateTableRow(columnNames, instance)}
                </tr>
        )
    }

    render() {
        return (
            <div className='row pt-2'>
                <div className='col-md-7'>
                    {this.state.entityProps && this.generateInstanceTable(this.state.entityProps, this.state.entityInstances)}
                </div>
                <div className='col-md-5 pr-4'>
                    <NewInstanceDialog 
                        entityTypes={this.state.entityProps}
                        addNewInstance={this.state.addNewInstance}
                    />
                </div>
            </div>
        )
    }
}