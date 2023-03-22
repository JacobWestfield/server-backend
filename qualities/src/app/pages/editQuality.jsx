import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import { useParams } from "react-router-dom";
import httpService from "../../services/http.service";

const EditQualityPage = () => {
  const id = useParams().id;
  const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;
  const [quality, setQuality] = useState(null);

  const handeleSubmit = async (data) => {
    try {
      await httpService
        .put(qualityEndPoint, data)
        .then((res) => console.log(res.data.content));
    } catch (error) {
      console.log("Expected Error");
    }
  };
  // eslint-disable-next-line
  useEffect(async () => {
    const { data } = await httpService.get(qualityEndPoint);
    setQuality(data.content);
  }, []);

  return (
    <>
      <h1>Edit Quality Page</h1>{" "}
      {quality !== null ? (
        <EditForm data={quality} onSubmit={handeleSubmit} />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default EditQualityPage;