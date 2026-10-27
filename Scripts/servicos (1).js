db.Servicos.aggregate([
  {
    $project: {
      _id: "$ServiceKey",
      ServiceKey: "$ServiceKey",
      Speciality: "$Speciality",
      Type: "$TypeDescription",
      Priority: "$PriorityDescription",
    },
  },
  {
    $merge: {
      into: "ServicosSEC",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert",
    },
  },
]);
