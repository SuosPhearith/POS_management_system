import React, { useEffect, useState } from 'react';
import './RatePage.css'
import dollarCurrency from './../../images/oneDollar.jpg';
import rielCurrency from './../../images/riel.jpg';
import { MdForward } from 'react-icons/md';
import errroHandler from '../../utils/ErrorHandler';
import request from '../../services/request';
import RateModal from '../../components/exchangeRate/RateModal';
import { Spin, message } from 'antd';
const RatePage = () => {
  const [riel, setRiel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [exchanage, setExchange] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(()=>{
    getList();
  },[])
  // GetList exchange rate function
  const getList = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "exchangeRate/get");
      setRiel(response.data[0].riel);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }
  const update = async () => {
    if(validate()) return;
    try {
      setLoading(true);
      let data = {
        riel : exchanage
      }
      const response = await request("PUT", "exchangeRate/update", data);
      getList();
      handleCancelForm();
      message.success(response.message);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = ()=>{
    update();
  }
  const handleCancelForm = () =>{
    setExchange();
    setIsModalOpen(false);
  }

  const validate = () =>{
    if(!exchanage || exchanage === ""){
      message.error("សូមបញ្ចូលលុយខ្មែរ!");
      return true;
    }
    return false;
  }
  return (
    <Spin spinning={loading}>
    <div className='main'>
      <div className='container'>
        <div className='currency-wrapper'>
            <img className='image' src={dollarCurrency} alt="dollar Currency" />
            <div className='icon'><MdForward/></div>
            <img className='image' src={rielCurrency} alt="dollar Currency" />
        </div>
        <div className='exchanage-wrapper'>
            <div className='exchange'>1$</div>
            <div className='exchange'><MdForward/></div>
            <div className='exchange'>{riel}៛</div>
        </div>
        <div>
          <button onClick={()=>setIsModalOpen(true)} className='btnEdit'>កែប្រែអត្រាប្តូរប្រាក់​​</button>
        </div>
      </div> 
    </div>
    <RateModal 
    isModalOpen = {isModalOpen}
    handleSubmit ={handleSubmit}
    handleCancelForm ={handleCancelForm}
    exchange={exchanage}
    setExchange={setExchange}
    />
    </Spin>
  );
}

export default RatePage;
