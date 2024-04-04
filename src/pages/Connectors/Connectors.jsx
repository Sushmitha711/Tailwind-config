import React, { useEffect, useState } from 'react'
import { Avatar, Select, SelectItem, ModalBody, Input, Textarea, ModalHeader, Modal, useDisclosure, User, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Dropdown } from "@nextui-org/react";
import ModalPopup from '../Collections/ModalPopup';
import { data } from "./ConnectorData";
import { SelectorIcon } from '../../Images/selectorIcon';
import { EyeSlashFilledIcon } from '../../Images/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../Images/EyeFilledIcon';
import { CreateData, getAllData } from '../../controllers/strapiController';
import Loading from '../../components/Loader/Loading';
import ConnectorTable from './ConnectorTable';

const Connectors = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedSource, setSelectedSource] = useState('');
  const [ConnecterList, setConnecterList] = useState(null);
  const [Validate, setValidate] = useState(false);
  const [Loader,setLoader]=useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const UserData=JSON.parse(sessionStorage.getItem("userData"));
  const UserId=UserData&&UserData.user&&UserData.user.id;
  const [ConnectorSchema, setConnectorSchema] = useState('');
  const CollectionName="connector-lists";
  const Theme=localStorage.getItem("Theme");
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
  });
  const [Connector, setConnector] = useState({
    connector_Name: '',
    Description: '',
    schema: ''
  })
  const [ConnectorError, setConnectorError] = useState({
    NameError: '',
    DescriptionError: '',
    SchemaError: ''
  })


  useEffect(() => {
    setLoader(true);
    getAllData(CollectionName)
      .then((data) =>{
        setLoader(false); 
        setConnecterList(data.data)})
      .catch((error) => alert(JSON.stringify(error)))
  }, [])

  const Capitalized = selectedSource && selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1, 10)
  const FilteredSource = ConnecterList && ConnecterList.filter((data) => data.attributes.Name === Capitalized);

  useEffect(() => {
    const SchemaData = FilteredSource && FilteredSource[0] && FilteredSource[0].attributes.Schema
    setConnectorSchema(SchemaData);
    SchemaData && Object.keys(SchemaData.properties).map((propertyName) => (
      setConnector((previous) => ({ ...previous, schema: { ...previous.schema, [propertyName]: '' } })),
      setConnectorError((previous) => ({ ...previous, SchemaError: { ...previous.SchemaError, [propertyName]: '' } })))
    )
  }, [selectedSource])

  const handleChange = (e, propertyName) => {
    const value = e.target.value;
    setConnector(prevData => ({
      ...prevData,
      schema: {
        ...prevData.schema,
        [propertyName]: value,
      }
    }));
  };

  console.log("Connector", Connector)

  const ConnectorValidation = () => {
    let isValid = true;

    if (!Connector.connector_Name && Connector.connector_Name === '') {
      isValid = false;
      setConnectorError((previous) => ({ ...previous, NameError: "Name of connector is required." }))
    } else {
      setConnectorError((previous) => ({ ...previous, NameError: null }))
    }

    if (!Connector.Description && Connector.Description === '') {
      isValid = false;
      setConnectorError((previous) => ({ ...previous, DescriptionError: "Description of connector is required." }))
    } else {
      setConnectorError((previous) => ({ ...previous, DescriptionError: null }))
    }

    if (Connector && Connector.schema) {
      const emptyFields = Object.entries(Connector.schema)
        .filter(([key, value]) => value === '')
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        const schemaErrorMessages = emptyFields.reduce(
          (errors, key) => ({ ...errors, [key]: `${key} is required.` }),
          {}
        );

        setConnectorError((previous) => ({
          ...previous,
          SchemaError: { ...previous.SchemaError, ...schemaErrorMessages },
        }));
        isValid = false;
      } else {
        setConnectorError(null);
      }
    }
    return isValid;
  }

  const uiSchema = {
    firstName: { 'ui:placeholder': 'Enter your first name' },
    lastName: { 'ui:placeholder': 'Enter your last name' },
    age: { 'ui:widget': 'updown' },
  };

  const CreateConnectorHandler =async ()=>{
    const Validate=ConnectorValidation();

    const payload={
      Name:Connector.connector_Name,
      Description:Connector.Description,
      Tags:Connector.schema,
      connector_list:{
        disconnect: [],
        connect: [{
          id: FilteredSource&&FilteredSource[0].id,
          position: {
            end: true
          }
        }]
      },
      users_permissions_user:{
        disconnect: [],
        connect: [{
          id: UserId,
          position: {
            end: true
          }
        }]
      }
    }
    if(Validate){
      setLoader(true)
      const collection="connectors";
      setValidate(false);
     const response=await CreateData(collection,payload);
     if(response){
      setLoader(false);
        window.location.reload();
     }
    }else{
      setValidate(true);
    }
  }

  const renderField = (propertyName, propertyType, uiOptions) => {
   
    if (propertyType === 'string') {
      return (
        <Input
          type={propertyType}
          radius="sm"
          labelPlacement="outside"
          className='border-slate-6'
          isInvalid={Validate && !Connector.schema[propertyName]?Validate &&ConnectorError.SchemaError[propertyName]&& !Connector.schema[propertyName]:""}
          errorMessage={Validate && !Connector.schema[propertyName] ? ConnectorError.SchemaError[propertyName] : ""}
          label={propertyName}
          placeholder={`Enter your ${propertyName}`}
          value={formData[propertyName]}
          onChange={(e) => handleChange(e, propertyName)}
        />
      );
    } else if (propertyType === 'password') {
      return (
        <Input
          radius="sm"
          labelPlacement="outside"
          className='border-slate-6'
          isInvalid={Validate && !Connector.schema[propertyName]?Validate &&ConnectorError.SchemaError[propertyName]&& !Connector.schema[propertyName]:""}
          errorMessage={Validate && !Connector.schema[propertyName] ? ConnectorError.SchemaError[propertyName] : ""}
          label={ConnectorSchema && ConnectorSchema.properties[propertyName].title}
          onChange={(e) => handleChange(e, propertyName)}
          placeholder={`Enter your ${propertyName}`}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
      );
    }
  };

  const ModalBodyData = () => {
    return <> <ModalHeader className="flex flex-col  gap-1">Create a new connector</ModalHeader>
      <ModalBody className='p-10 gap-0'>
        <Input
          isRequired
          key="outside"
          type="text"
          label="Connector Name"
          labelPlacement="outside"
          isInvalid ={Validate&& !Connector.connector_Name?Validate&& !Connector.connector_Name:""}
          errorMessage={Validate&& !Connector.connector_Name?ConnectorError&& ConnectorError.NameError:""}
          onChange={(e) => setConnector((previous) => ({ ...previous, connector_Name: e.target.value }))}
          placeholder="Give a name to your connector"
        />
        <Textarea
          className='pt-4'
          key={"outside"}
          isRequired
          type="text"
          isInvalid={Validate&& !Connector.Description?Validate&& !Connector.Description:""}
          errorMessage={Validate&& !Connector.Description?ConnectorError&&ConnectorError.DescriptionError:""}
          onChange={(e) => setConnector((previous) => ({ ...previous, Description: e.target.value }))}
          label="Decription"
          labelPlacement={"outside"}
          placeholder="Enter your collection's Description"
        />
        <Select
          label="Choose a data source"
          placeholder="Select a datasource"
          labelPlacement="outside"
          className="pt-4"
          isRequired
          selectedKey={[selectedSource]}
          onSelectionChange={(e) => setSelectedSource(e.anchorKey)}
          selectorIcon={<SelectorIcon />}
        >
          {data.map((data) => (
            <SelectItem key={data.value} textValue={data.label}
            >
              <div className='flex gap-2 items-center'>
                <Avatar alt={data.name} className="flex-shrink-0" size="sm" src={data.avatar} />
                {data.label}
              </div>
            </SelectItem>
          ))}
        </Select>
        <div className='pt-4'>
          {ConnectorSchema && ConnectorSchema !== '' && Object.keys(ConnectorSchema.properties).map((propertyName, index) => (
            <div key={index} className='pb-4 space-y-2'>
              {renderField(propertyName, ConnectorSchema.properties[propertyName].type, uiSchema[propertyName])}
            </div>
          ))}
        </div>
      </ModalBody>
    </>
  }

  const ModelFooterData = () => {
    return <><Button color="default" variant="flat">
      Cancel
    </Button>
      <Button color="danger" onClick={CreateConnectorHandler}>
        Create
      </Button></>
  }

  return (
    <div>
     {Loader ? <div className={`absolute z-[100]  inset-0 h-screen w-screen ${Theme==="dark"?'bg-black':'bg-slate-50'}`}>
        <Loading />
      </div> : ""}
      <div className='text-3xl font-medium'>Connectors</div>
      <div className='mt-4 leading-relaxed'>
        Data connectors can help you to bring external sources directly into your knowledge base. Each connector can be connected to your collection folders. You can also have multiple connectors to one collection.
      </div>
      <div className='flex mt-4 justify-end'>
        <Button color='danger' onPress={onOpen}>
          Create a new connector
        </Button>
      </div>
      <div className='pt-8'>
       <ConnectorTable/>
      </div>
      <ModalPopup
        size="2xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        ModalBodyData={ModalBodyData}
        footer={ModelFooterData}
      />
    </div>
  )
}

export default Connectors