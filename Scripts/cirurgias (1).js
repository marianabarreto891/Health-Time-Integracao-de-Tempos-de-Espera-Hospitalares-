db.TemposEsperaConsultaCirurgia.aggregate([
  {
    $lookup: {
      from: "Servicos",
      localField: "ServiceKey",
      foreignField: "ServiceKey",
      as: "serviceDetails",
    },
  },
  {
    $unwind: "$serviceDetails",
  },
  {
    $match: {
      "serviceDetails.TypeDescription": "Cirurgia",
    },
  },
  {
    $project: {
      _id: 0,
      hospital: "$HospitalName",
      serviceId: "$ServiceKey",
      speciality: "$serviceDetails.Speciality",
      priority: "$serviceDetails.PriorityDescription",
      period: {
        year: "$Year",
      },
      averageWaitingTime: "$AverageWaitingTime_Speciality_Priority_Institution",
      numPatients: "$NumberOfPeople",
    },
  },
  {
    $merge: {
      into: "CirurgiasSEC",
      whenMatched: "keepExisting",
      whenNotMatched: "insert",
    },
  },
]);
