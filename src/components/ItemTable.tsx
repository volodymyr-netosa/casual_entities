
import * as React from "react";
import { Table } from "react-bootstrap";
import { NewInstanceDialog } from "./NewInstanceDialog";


type Props = { 
    selectedEntityName: string, 
    entityProps:{[key:string] : string}, 
    entityInstances: {}[],
    addInstanceHandler: (entity: {}) => any 
}
// type State = { entityProps: {[key:string]: string}, entityInstances: {}[]}

export class ItemsTable extends React.Component<Props,null> {

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
        let entity = this.props.entityProps;
        return (
            <>                      
                {entity &&                      //Todo fix it
                    <div className='row pt-2'>
                        <div className='col-md-7'>
                            {this.generateInstanceTable(this.props.entityProps, this.props.entityInstances)}
                        </div>
                        <div className='col-md-5 pr-4'>
                            <NewInstanceDialog
                                entityName={this.props.selectedEntityName}
                                entityTypes={this.props.entityProps}
                                addInstanceHandler={this.props.addInstanceHandler}
                            />
                        </div>
                    </div>
                }
            </>
        )
    }
}