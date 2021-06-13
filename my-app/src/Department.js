import React, { Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModel} from './AddDepModel';
import {EditDepModel} from './EditDepModal';

export class Department extends Component {

    constructor(props){
        super(props);
        this.state={deps:[],addModalShow:false,editModalShow:false}
    }
    
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data =>{
            this.setState({deps:data});

        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm("Are You sure , You want to delete")){
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {deps,depid,depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" stripped bordered hover sixe="sm">
                    <thead>
                        <tr>
                        <th>DepartmentId</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,depid:dep.DepartmentId,depname:dep.DepartmentName})}>
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteDep(dep.DepartmentId)}>
                                        Delete
                                    </Button>
                                    <EditDepModel show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    depid={depid}
                                    depname={depname}/>
                                </ButtonToolbar>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                    Add Department
                    </Button>
                    <AddDepModel show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
            )
    }
}