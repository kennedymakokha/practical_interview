/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Input, { TextArea } from "@/components/Input";
import Create_Modal from "@/components/modals/createModal";
import DetailModal from "@/components/modals/detailModal";
import Sidebar from "@/components/sideBar";
import Table from "@/components/table"
import instance from "@/utils/instance";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Home() {
  const [popUp, setPopUp] = useState(false)
  const [show, setShow] = useState(false)
 
  const [campaigns, setCampaigns] = useState([])
  const initialState = {
    name: "",
    link: "",
    budget: "",
    start: "",
    end: "", description: "",

  }

  const [item, setItem] = useState(initialState)
  const [user, setUser] = useState<any>(null)
  const fetchUser = async () => {
    try {
      const response = await instance.get('user')
      if (response?.data?.user) {
        setUser(response.data.user)
      }

    } catch (error) {
      console.log(error)
    }
  };

  const fetchData = async () => {
    try {
      const response = await instance.get('campaign')
      if (response?.data?.campaign) {
        setCampaigns(response.data.campaign)
      }

    } catch (error) {
      console.log(error)
    }
  };

  const columns = [
    { Header: 'name', accessor: 'name' },
    { Header: 'Campaign launch Status', accessor: 'state' },
    { Header: 'lINK', accessor: 'link' },
    { Header: 'Campaign  start Date', accessor: 'start' },
    { Header: 'Campaign  end Date', accessor: 'end' },

  ];

  const handleChange = (e: any, name: any) => {
    setItem(((prev) => ({
      ...prev, [name]: e
    })))
  }
  const ToggleCreateModal = () => {
    setPopUp(true)
  }
  const openDetailModal = (data: any) => {
   
    setShow(true)
    setItem(data)
  }
  const closeDetailModal = () => {
    setShow(false)
    setItem(initialState)
  }
  const submit = async () => {
    try {
      const response = await instance.post("campaign", item)
      await fetchData()
      setPopUp(false)
      setItem(initialState)
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
      else {
        toast.error("Unknown Error Occured please ty again later")
      }
    }
  }
  useEffect(() => {
    fetchData()
    fetchUser()


  }, [])
  let data = [...campaigns]
  if (user && user?.role === "campaigner") {
    data = data.filter((c: any) => c.createdBy === user?._id)
  }

  return (
    <div className="  font-[family-name:var(--font-geist-sans)]">

      <Sidebar>
        {user?.role === "campaigner" && <Table
          noAction={true}
          role="influencer"
          addFunction={ToggleCreateModal}
          openDetailModal={openDetailModal}
          closeDetailModal={closeDetailModal}
          state="scheduled"
          key_column="name" columns={columns}
          title="" data={data.filter((x: any) => x?.state === "scheduled")}
        />}
        <Table
          noAction={true}
          openDetailModal={openDetailModal}
          closeDetailModal={closeDetailModal}
          state="launched"
          key_column="name" columns={columns}
          title="" data={data.filter((x: any) => x.state === "launched")}

        />
        <Table
          noAction={true}
          openDetailModal={openDetailModal}
          closeDetailModal={closeDetailModal}
          state="completed"
          key_column="name" columns={columns}
          title="" data={data.filter((x: any) => x.state === "completed")}

        />
      </Sidebar>

      {popUp && <Create_Modal
        // error={error}
        submit={submit}
        cancel={() => setItem(initialState)}
        item={item}
        body={<div className='gap-y-2 flex w-full flex-col'>
          <div className="flex gap-2">
            <Input label="Name" required name="name" value={item.name} onChange={handleChange} />
            <Input label="Link" required name="link" value={item.link} onChange={handleChange} />
          </div>
          <div className="flex gap-x-2">
            <Input label="budget" required name="budget" value={item.budget} onChange={handleChange} />

          </div>
          <div className="flex gap-x-2">
            <Input label="start " required name="start" value={item.start} type="date" onChange={handleChange} />
            <Input label="end" required name="end" value={item.end} type="date" onChange={handleChange} />
          </div>
          <div className="flex ">
            <TextArea label="Description" required name="description" value={item.description} onChange={handleChange} />
          </div>


        </div>}
        title="create a new Campaign" setPopUp={setPopUp} />}

      {show && <DetailModal

        submit={submit}
        fetchData={fetchData}
        cancel={closeDetailModal}
        item={item}
        role={user && user?.role}
        body={<div></div>}
        title={item.name} />}
    </div>

  );
}


