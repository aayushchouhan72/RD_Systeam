import { create } from "zustand";
import toast from "react-hot-toast";

import Axios from "../utils/axios";
import { Flag } from "lucide-react";

export const useUserStore = create((set) => ({
  isRegistering: false,
  userAccountNumber: null,
  checkingUserRegister: false,
  isEligibleAddNominee: false,
  isAddingnominee: false,
  isNomineeAdd: false,
  isCheckingNomineeAddOrNot: false,
  rdRegisterUser: async (formData) => {
    set({ isRegistering: true });
    try {
      const payload = {
        fullname: formData.fullName,
        adharno: formData.adharNo,
        photourl: null, // abhi photo skip
        dob: formData.dob,
        email: formData.email,
        panno: formData.panNo,
        occupation: formData.occupation,
      };
      const res = await Axios.post("/rduser/registeruser", payload);
      set({ userAccountNumber: res?.data?.data });
      set({ isEligibleAddNominee: true });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isRegistering: false });
    }
  },
  Addnominee: async (data, acnum) => {
    console.log(acnum);
    set({ isAddingnominee: true });
    try {
      const response = await Axios.post(`/rduser/addnominee/${acnum}`, data);
    } catch (error) {
      console.log("error in addNominee function", error.message);
    } finally {
      set({ isAddingnominee: false });
      set({ isNomineeAdd: true });
    }
  },
  CheckuserisRegisterforrd: async (data) => {
    set({ checkingUserRegister: true });
    try {
      const res = await Axios.post("/rduser/check", data);
      set({ userAccountNumber: res.data.accountNumber });
    } catch (error) {
      console.log(
        "Error in the checking user is register ig not",
        error.message
      );
    } finally {
      set({ checkingUserRegister: false });
    }
  },
}));
