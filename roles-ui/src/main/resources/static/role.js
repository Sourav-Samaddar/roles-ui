const EachEditPanel = (props) => {
	return (
		<div className='panel panel-default panel-color'>
			<div className="panel-heading panel-color" onClick={props.openPanelClick}>
				{props.header}				
			</div>
			<div className={props.showHidePanel}>								
				<table><tbody>{props.body}</tbody></table>								
			</div>
		</div>
	);
};

const EditModal = (props) => { 
  const showHideClassName = props.open ? 'modal display-block fade-in' : 'modal display-none';
  const showHideInfoPanel = props.openInfoPanel ? 'panel-body display-block' : 'panel-body display-none';
  const showHideAppPanel =  props.openAppPanel ? 'panel-body display-block' : 'panel-body display-none';

  function formatLabel(each) { 
	var firstLetter = (each.substring(0,1)).toUpperCase();
	var name = firstLetter+ each.substring(1, each.length);
	return name;
}
  
  var fieldsArray = [];
  var row = props.row;
		for (const each in row) {
		
		  fieldsArray.push(
				<tr>
				<td><label className='label-color'>{formatLabel(each)}</label></td>
				<td style={{padding: '5px', width: '900px'}}><input key={each}
						className={  ' form-control editor edit-text' }
						style={ { display: 'inline', width: '50%' } }
						type='text'
						value={ row[each] }
						id={each}
						 onChange={props.changeValue }/></td>
				</tr>
			
		  ); 
		}

  return (
    <div className={showHideClassName}>
		<div className='modal-dialog'>
			<div className='modal-content'>
				<div className='modal-header'>
					<h4>Edit Roles</h4>
				</div>
				<div className='modal-body'>
					<div className='panel-group'>
						<EachEditPanel header="Roles Information" buttonId="info" showHidePanel={showHideInfoPanel}  openPanelClick={props.openInfoPanelClick} body={fieldsArray}/>
						<EachEditPanel header="Application Specific Data" buttonId="app" showHidePanel={showHideAppPanel} openPanelClick={props.openAppPanelClick} body="<h4>ViewPoint Sample Application</h4>" />						
					</div>
				</div>
				<div className='modal-footer'>
					<button type='button' className='btn btn-primary' onClick={ props.updateData }>Done</button>
					<button type='button' className='btn btn-default' onClick={props.handleClose}>Close</button>
				</div>
			  </div>
			</div>
    </div>
  );
};

class InsertModal extends React.Component {

  handleSaveBtnClick = () => {
    const { columns, onSave } = this.props;
    const newRole = {};
    columns.forEach((column, i) => {
      newRole[column.field] = this.refs[column.field].value;
    }, this);
    let newRow = {};
        for (const prop in newRole) {
            if(prop != 'button')
            	newRow[prop] = newRole[prop];
        }
        alert(newRow.roleId);
		
    axios.post("/addRole/post", newRow)
		.then ( response => {
			console.log(newRow);
		});
  }

  render() {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    } = this.props;
    return (
	
	<div className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
			<h4>Add Roles</h4>
		</div>
        <div className='modal-body'>
		<div className='panel-group'>
		<div className='panel panel-default panel-color'>
			<div className="panel-heading panel-color">
				Roles Information				
			</div>
			<div className="panel-body display-block"><table><tbody>
          {
            columns.map((column, i) => {
              const {editable, format, field, name, hiddenOnInsert} = column;
              const error = validateState[field] ? (<span className='help-block bg-danger'>{ validateState[field] }</span>) : null;
              return (
                  <tr><td><label className='label-color'>{ name }  </label></td>
                  <td style={{padding: '5px', width: '900px'}}><input ref={ field } className={  ' form-control editor edit-text' }
						style={ { display: 'inline', width: '50%' } } type='text' defaultValue={ '' } /></td>
                  { error }</tr>              
				);
            })
          }</tbody></table>
        </div>
		</div>
		<div className='panel panel-default panel-color'>
			<div className="panel-heading panel-color">
				Application Information				
			</div>
			<div className="panel-body display-block">ViewPoint Sample Application
			</div>
		</div>
		</div>
		</div>
        <div className='modal-footer'>
			<button className='btn btn-primary' onClick={ () => this.handleSaveBtnClick(columns, onSave) }>Save</button>
			<button className='btn btn-default' onClick={ onModalClose }>Close</button>
        </div>
      </div>
	 </div>	  
    );
  }
}



function rowStyleFormat(row, rowIdx) {
	return rowIdx % 2 === 0 ? 'checkbook-on' : 'checkbook-off';
}



class RolesGridTable extends React.Component {
	createCustomToolBar = props => {
	    return (
	      <div style={ { margin: '15px' } }>
	        { props.components.btnGroup }
	        <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
	          { props.components.searchPanel }
	        </div>
	      </div>
	    );
	}

			state = {
				open : false,
				openInfoPanel : true,
				openAppPanel : false,
				editRow: [],
				roles : []
	}
	
	componentDidMount () {
		axios.get(this.props.dataUrl)
		.then ( response => {
			this.setState({roles : response.data});
		});
	}

 
	renderShowsTotal(start, to, total) {
    return (
      <span className="totalDetails">
        Records { start } - { to } of { total }
      </span>
    );
  }
  
	showModal = (row) => { 
    this.setState({ open: true });
  }
  
  hideModal = () => {
    this.setState({ open: false });
  }
  
   updateData = () => {
   this.setState({ open: false });
  alert("Sourav33");
    axios.post("/updateRole/post", this.state.editRow)
		.then ( response => {
			console.log(newRow);
		});
  }
  openInfoPanelClick = () => { 
	if (this.state.openInfoPanel) {
	this.setState({openInfoPanel : false})
	} else {
	this.setState({openInfoPanel : true})
	}
  }
  
  openAppPanelClick = () => { 
	if (this.state.openAppPanel) {
		this.setState({openAppPanel : false})
	} else {
		this.setState({openAppPanel : true})
	}
  }

createCustomAddModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable
    };
    return (
      <InsertModal { ... attr } />
    );
  }
	
  
  changeValue = (event,row) =>{ 
	const roleIndex = this.state.roles.findIndex(p => {
					return p.name == row.name;
				}); 
	const newRole = {...this.state.roles[roleIndex]};
	for (const prop in newRole ) {
		if(prop == event.currentTarget.id) {
			newRole[prop] = event.currentTarget.value; 
		}
	}
	const copyRole = [...this.state.roles];
	copyRole[roleIndex]=newRole;

	this.setState({
		editRow : newRole,
		roles : copyRole		
		});
	}
	


	  cellButton(cell, row) { 
		return (
		<div>
			<EditModal open={this.state.open} openInfoPanelClick = {this.openInfoPanelClick.bind(this)} openAppPanelClick = {this.openAppPanelClick.bind(this)} openAppPanel = {this.state.openAppPanel} openInfoPanel = {this.state.openInfoPanel} handleClose={this.hideModal.bind(this)} updateData={this.updateData.bind(this)} row={this.state.editRow} changeValue={(event) => this.changeValue(event, this.state.editRow)}>
			</EditModal>
		   <button type="button" className='btn btn-default' onClick={this.openModal.bind(this,row)}>
		   Edit
		   </button>
		   </div>
		);
	 }
	 
	 openModal = (row) => { 
	 this.setState({
		open: true,
		editRow: row,
		openInfoPanel: true
	 });
	 }
	 
	 onAfterDeleteRow = (row) => {

		//axios.delete(this.props.dataUrl+row)
		//.then ( response => {
			//console.log(newRow);
		//});
		
	 }
 
 
	 onAfterInsertRow = (row) => {
		let newRow = '{"roles":[{';
        for (const prop in row) {
			if(prop != 'button')
        	newRow += '\"'+prop+'\"' + ': ' + '\"' + row[prop] + '\"' + ',';
        }
		newRow = newRow.substring(0, newRow.length-1);
		newRow += '}]}'; 
		newRow = JSON.parse(newRow);
		alert("Sourav11");
		//axios.post(this.props.dataUrl, newRow)
		//.then ( response => {
		//	console.log(newRow);
		//});
		
	 }
	
	 
	 
	render () {
	
		const options = {
		  page: 1,  
		  sizePerPageList: [ {
			text: '25', value: 25
		  }, {
			text: '50', value: 50
		  }, {
			text: '100', value: 100
		  }, {
			text: 'All', value: this.state.roles.length
		  } ],
		  sizePerPage: 25,
		  pageStartIndex: 1,
		  paginationSize: 3,
		  prePage: '<-', 
		  nextPage: '->', 
		  firstPage: '<=', 
		  lastPage: '=>', 
		  paginationShowsTotal: this.renderShowsTotal, 
		  paginationPosition: 'top',
		  insertText : 'Add',
		  afterInsertRow: this.onAfterInsertRow,
		  afterDeleteRow: this.onAfterDeleteRow,
		  toolbar: this.createCustomToolBar,
		  insertModal: this.createCustomAddModal
		};
		
		const selectRowProp = {
		mode: 'checkbox',
		hideSelectColumn: true,
		clickToSelect: true,
		bgColor: '#5E747E'
		};

		return (
		<div>
		<div className='page-heading'>Roles</div>
		
			<BootstrapTable data= {this.state.roles} hover options={options} bordered={false}
			selectRow={selectRowProp} pagination insertRow deleteRow search editRow={true} trClassName={rowStyleFormat}>
				<TableHeaderColumn dataField='roleId' isKey dataSort={ true }>Role ID</TableHeaderColumn>
				<TableHeaderColumn dataField='roleName' dataSort={ true }>Role Name</TableHeaderColumn>
				<TableHeaderColumn dataField='enterpriseName' dataSort={ true }>Enterprise Name</TableHeaderColumn>
				<TableHeaderColumn dataField='description' dataSort={ true }>Description</TableHeaderColumn>
				<TableHeaderColumn dataField='inheritable' dataSort={ true }>Inheritable</TableHeaderColumn>
				<TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}></TableHeaderColumn>
			</BootstrapTable>
			</div>
		);
	}
}

	

ReactDOM.render(
	<RolesGridTable dataUrl="/allRoles/json"/>,
	document.getElementById("gridData")
	);
