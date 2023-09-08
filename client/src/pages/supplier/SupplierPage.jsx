import React, { useEffect, useState } from 'react';
import SupplierTable from '../../components/supplier/SupplierTable';
import style from './SupplierPage.module.css';
import { Spin, Button, message} from 'antd';
import Search from '../../components/search/Search';
import errroHandler from '../../utils/ErrorHandler';
import request from '../../services/request';
import SupplierModal from '../../components/supplier/SupplierModal';

const SupplierPage = () => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    getList();
  },[])
  // GetList function
  const getList = async () =>{
    try {
      setLoading(true);
      const response = await request("GET", "suppliers/getList");
      setSuppliers(response.suppliers);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Insert function
  const insertSupplier = async () =>{
    if(validateError()) return;
    try {
      setLoading(true);
      let supplierData = new FormData();
      supplierData.append("code", code);
      supplierData.append("name", name);
      supplierData.append("contact", contact);
      supplierData.append("address", address);
      supplierData.append("email", email);
      supplierData.append("file", file);
      const response = await request("POST", "suppliers/create", supplierData)
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Update function
  const updateSupplier = async () =>{
    if(validateError()) return;
    try {
      setLoading(true);
      let supplierData = new FormData();
      supplierData.append("code", code);
      supplierData.append("name", name);
      supplierData.append("contact", contact);
      supplierData.append("address", address);
      supplierData.append("email", email);
      supplierData.append("file", file);
      const response = await request("PUT", `suppliers/update/${id}`, supplierData);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Delete function

  const deleteSupplier = async (id) =>{
    if(!id){
      message.error("មិនមានID!"); 
      return;
    }
    try {
      setLoading(true);
      const response = await request("DELETE", `suppliers/delete/${id}`);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Handle update
  const handleUpdate = (id, code, name, contact, address, email, image) =>{
    setIsModalOpen(true);
    setId(id);
    setCode(code);
    setName(name);
    setContact(contact);
    setAddress(address);
    setEmail(email);
    setFile(image);
  }

  const handleDelete = (id) =>{
    deleteSupplier(id);
  }

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  }

  // Filter users based on search query
  const filteredUsers = suppliers.filter(supplier =>{
    const supplierId = String(supplier.id);
    return(
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplierId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
    
  );

  // Handle clear
  const handleClear = () => {
    setId("");
    setCode("");
    setName("");
    setContact("");
    setAddress("");
    setEmail("");
    setFile();
  }

  // Handle clear form 
  const handleCancelForm = () =>{
    setIsModalOpen(false);
    handleClear();
  }

  // Handle submit insert and update
  const handleSubmit = () =>{
    if(id === "" || id === null){
      insertSupplier();
    }else{
      updateSupplier();
    }
  }

  // validate error

  const validateError = () =>{
    if(code === ""){
      message.error("សូមបញ្ជូលកូដ!");
      return true;
    }
    if(name === "" || name.length < 3){
      message.error("សូមបញ្ជូលឈ្មោះលើសពី៣អក្សរ!");
      return true;
    }
    if(contact === "" || contact.length < 8){
      message.error("សូមបញ្ជូលលេខទំនាក់ទំនង!");
      return true;
    }
    return false;
  }
  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងអ្នកនាំចូល</h3>
            <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
          </div>
          <div className={style.create}>
            <Button className={style.btn} type = 'primary' onClick={() => setIsModalOpen(true)} >បង្កើតអ្នកនាំចូលថ្មី</Button>
          </div>
        </div>
        <div>
          <SupplierTable
           suppliers={filteredUsers}
           handleUpdate = {handleUpdate}
           handleDelete = {handleDelete}
          />
        </div>
      </main>
      <SupplierModal
        isModalOpen = {isModalOpen}
        handleSubmit = {handleSubmit}
        handleCancelForm = {handleCancelForm}
        id = {id}
        code = {code}
        name = {name}
        contact = {contact}
        address ={address}
        email = {email}
        file = {file}
        setId = {setId}
        setCode = {setCode}
        setName = {setName}
        setContact = {setContact}
        setAddress = {setAddress}
        setEmail = {setEmail}
        setFile = {setFile}
      />

    </Spin>
  );
}

export default SupplierPage;
