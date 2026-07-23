import React from "react";
import System from "./System";
import Banner from "./Banner";
import ProfilePic from "./ProfilePic";

const Home = ({ contacts, setPage, setEditId, setContacts, loading }) => {
  return (
    <div>
      <Banner setPage={setPage} loading={loading}/>
      <System contacts={contacts} setPage={setPage} setEditId={setEditId} loading={loading} />
      <ProfilePic contacts={contacts} setContacts={setContacts} loading={loading} />
    </div>
  );
};

export default Home;
