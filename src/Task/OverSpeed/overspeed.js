import Table from 'react-bootstrap/Table';

import {db} from '../../firebase';

import MyTable from './overspeedtable';

import {collection, getDocs,  doc, deleteDoc} from 'firebase/firestore';

import { useState, useEffect } from 'react';

import 'font-awesome/css/font-awesome.min.css';

export default function OverSpeed() {

      const [Employee, setEmployee] = useState([]);
    
      const deleteEmployee = async (id) => {
        const empDoc = doc(db, "overspeed", id);
        await deleteDoc(empDoc);
     }


    useEffect(() => {
          const getEmployee = async () => {

          const data = await getDocs(collection(db, "OverSpeed"));

          setEmployee(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         };
         getEmployee();

      },[collection(db, "OverSpeed")]);
    
  return (
<MyTable data={Employee}></MyTable>
  );

}
