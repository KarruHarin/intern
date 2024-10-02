"use server"
import {getUserById} from '@/data/user';


export const getProfileData = async (id:any) => {
    if (id) {
    const data = await getUserById(id);    
    return data;
  } 
  else {
    return null;
  }
};