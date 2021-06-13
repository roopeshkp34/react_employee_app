import React, { Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModel} from './AddEmpModel';
import {EditEmpModel} from './EditEmpModal';

export class Employee extends Component {

    constructor(props){
        super(props);
        this.state={emps:[],addModalShow:false,editModalShow:false}
    }
    
    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data =>{
            this.setState({emps:data});

        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm("Are You sure , You want to delete")){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {emps,empid,empname,depart,date,Image}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" stripped bordered hover sixe="sm">
                    <thead>
                        <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Department</th>
                        <th>Date of join</th>
                        <th>Image</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                        <tr key={emp.EmployeeId}>
                            <td>{emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.DateofJoining}</td>
                            <td>{emp.Image}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,empid:emp.EmployeeId,empname:emp.EmployeeName,depart:emp.Department,date:emp.DateofJoining,Image:emp.Image})}>
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteEmp(emp.EmployeeId)}>
                                        Delete
                                    </Button>
                                    <EditEmpModel show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    empid={empid}
                                    empname={empname}
                                    depart={depart}
                                    date={date}
                                    Image={Image}/>
                                </ButtonToolbar>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee
                    </Button>
                    <AddEmpModel show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
            )
    }
}