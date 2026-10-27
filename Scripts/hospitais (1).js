db.Hospitais.aggregate([
  {
    $project: {
      _id: "$HospitalID",
      HospitalKey: "$HospitalKey",
      HospitalName: "$HospitalName",
      Description: "$Description",
      Address: "$Address",
      District: "$District",
      Contacts: {
        PhoneNum: "$PhoneNum",
        Email: "$Email",
      },
      Location: {
        Latitude: "$Latitude",
        Longitude: "$Longitude",
      },
      NUTS: {
        NUTSIDescription: "$NUTSIDescription",
        NUTSIIDescription: "$NUTSIIDescription",
        NUTSIIIDescription: "$NUTSIIIDescription",
      },
    },
  },
  {
    $merge: {
      into: "HospitaisSEC",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert",
    },
  },
]);
